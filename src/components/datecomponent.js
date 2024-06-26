import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './date.css'
import dayjs from "dayjs";

function DateComponent({ onSelect }) {
    const [selectedDates, setSelectedDates] = useState([null, null]);
    const [excludeSaturdays, setExcludeSaturdays] = useState(false);
    const [excludeSundays, setExcludeSundays] = useState(false);
    const [multipleDates, setMultipleDates] = useState([]);
    const [selectedCount, setSelectedCount] = useState(0);
    const [removedDates, setRemovedDates] = useState([]);
    const [savedDates, setSavedDates] = useState([]);

    useEffect(() => {
        let newMultipleDates = multipleDates.filter((date) => {
            const day = new Date(date).getDay();
            return !((day === 6 && excludeSaturdays) || (day === 0 && excludeSundays));
        });

        if (!excludeSaturdays || !excludeSundays) {
            const reAddDates = removedDates.filter((date) => {
                const day = new Date(date).getDay();
                return (day === 6 && !excludeSaturdays) || (day === 0 && !excludeSundays);
            });
            newMultipleDates = [...newMultipleDates, ...reAddDates];
            setRemovedDates((prevRemovedDates) => prevRemovedDates.filter((date) => !reAddDates.includes(date)));
        } else {
            setRemovedDates((prevRemovedDates) => [
                ...prevRemovedDates,
                ...multipleDates.filter((date) => !newMultipleDates.includes(date))
            ]);
        }

        setMultipleDates(newMultipleDates);
        setSelectedCount(newMultipleDates.length);
        console.log(
            "Updated Multiple Dates:",
            newMultipleDates.map((d) => dayjs(d).format("YYYY-MM-DD"))
        );
    }, [excludeSaturdays, excludeSundays]);

    const handleDateChange = (dates) => {
        if (Array.isArray(dates)) {
            if (dates[0] && dates[1]) {
                const datesExistInMultipleDates = dates.some((date) => {
                    return multipleDates.some((d) => dayjs(d).isSame(date, "day"));
                });

                if (datesExistInMultipleDates) {
                    const newMultipleDates = multipleDates.filter((d) => {
                        return !dates.some((date) => dayjs(d).isSame(date, "day"));
                    });
                    setMultipleDates(newMultipleDates);
                    setSelectedCount(newMultipleDates.length);
                    console.log(
                        "Updated Multiple Dates:",
                        newMultipleDates.map((d) => dayjs(d).format("YYYY-MM-DD"))
                    );
                } else {
                    setSelectedDates(dates);
                    const allDates = generateDateRange(dates[0], dates[1]);
                    setMultipleDates((prevDates) => {
                        let newDates = [...prevDates];
                        allDates.forEach((date) => {
                            const day = new Date(date).getDay();
                            if (!newDates.some((d) => dayjs(d).isSame(date, "day")) && !((day === 6 && excludeSaturdays) || (day === 0 && excludeSundays))) {
                                newDates.push(date);
                            }
                        });
                        setSelectedCount(newDates.length);
                        console.log(
                            "Updated Multiple Dates:",
                            newDates.map((d) => dayjs(d).format("YYYY-MM-DD"))
                        );
                        return newDates;
                    });
                }
            } else if (dates[0] && !dates[1]) {
                setSelectedDates([dates[0], null]);
            }
        }
    };

    const handleIndividualDateChange = (date) => {
        const day = new Date(date).getDay();
        if ((day === 6 && excludeSaturdays) || (day === 0 && excludeSundays)) {
            return; // Do nothing if the date is a Saturday or Sunday and exclusion is enabled
        }

        setMultipleDates((prevDates) => {
            const dateExists = prevDates.some((d) => dayjs(d).isSame(date, "day"));
            let newDates;
            if (dateExists) {
                newDates = prevDates.filter((d) => !dayjs(d).isSame(date, "day"));
            } else {
                newDates = [...prevDates, date];
            }
            setSelectedCount(newDates.length);

            // Update selectedDates if necessary
            if (selectedDates[0] && dayjs(selectedDates[0]).isSame(date, "day")) {
                setSelectedDates([null, selectedDates[1]]);
            } else if (selectedDates[1] && dayjs(selectedDates[1]).isSame(date, "day")) {
                setSelectedDates([selectedDates[0], null]);
            } else if (selectedDates[0] && selectedDates[1] && dateExists) {
                setSelectedDates([null, null]);
            }

            return newDates;
        });
    };

    const generateDateRange = (start, end) => {
        let dates = [];
        let currentDate = new Date(start);
        while (currentDate <= end) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    const dayClassName = (date) => {
        const day = date.getDay();
        const isSelectedDate = multipleDates.some((d) =>
            dayjs(d).isSame(date, "day")
        );
        const isInRange =
            selectedDates[0] &&
            selectedDates[1] &&
            date >= selectedDates[0] &&
            date <= selectedDates[1];
        const isRemovedDate = !isSelectedDate && isInRange;
        if (isSelectedDate) {
            return "selected-day";
        }
        if ((day === 6 && excludeSaturdays) || (day === 0 && excludeSundays)) {
            return "weekend-day";
        }
        if (isInRange) {
            return "range-day";
        }
        if (isRemovedDate) {
            return "removed-day"; // Apply your CSS class for removed dates here
        }
        return "";
    };

    const handleExcludeSaturdaysChange = (e) => {
        setExcludeSaturdays(e.target.checked);
    };

    const handleExcludeSundaysChange = (e) => {
        setExcludeSundays(e.target.checked);
    };

    const handleSaveDates = () => {
        const newSavedDates = [...multipleDates];
        setSavedDates(newSavedDates);
        onSelect(newSavedDates); // Pass saved dates back to parent component
        console.log("Saved Dates:", newSavedDates.map((d) => dayjs(d).format("YYYY-MM-DD")));
        // You can perform additional actions with savedDates, such as passing it to a parent component or storing it in local storage
    };


    return (
        <div className="container">
            <div className="calendar-container">
                <div className="selected-container">
                    <form className="form">
                        <div>
                            <input
                                type="checkbox"
                                id="saturday"
                                name="saturday"
                                checked={excludeSaturdays}
                                onChange={handleExcludeSaturdaysChange}
                            />
                            <label htmlFor="saturday"> Saturday</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="sunday"
                                name="sunday"
                                checked={excludeSundays}
                                onChange={handleExcludeSundaysChange}
                            />
                            <label htmlFor="sunday"> Sunday</label>
                        </div>
                    </form>
                    <div className="form">
                        <p>Selected Dates: {selectedCount}</p>
                    </div>
                    <button onClick={handleSaveDates}>Save</button>
                </div>
                <div>
                    <div className="date-range-field">
                        <input
                            type="text"
                            placeholder="Start Date"
                            value={
                                selectedDates[0] ? selectedDates[0].toLocaleDateString() : ""
                            }
                            readOnly
                        />
                        <input
                            type="text"
                            placeholder="End Date"
                            value={
                                selectedDates[1] ? selectedDates[1].toLocaleDateString() : ""
                            }
                            readOnly
                        />
                    </div>
                    <DatePicker
                        selected={selectedDates[0]}
                        startDate={selectedDates[0]}
                        endDate={selectedDates[1]}
                        onChange={(date) => {
                            handleDateChange(date);
                        }}
                        onClickDay={handleIndividualDateChange}
                        selectsRange
                        inline
                        dayClassName={dayClassName}
                        dateFormat="dd/MM/yyyy"
                        highlightDates={multipleDates}
                    />
                </div>
            </div>
        </div>
    );
}

export default DateComponent;
