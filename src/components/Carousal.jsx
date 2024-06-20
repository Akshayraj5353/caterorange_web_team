import React from 'react'
import Carousel from 'react-material-ui-carousel';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const items = [
    {
        src: 'https://g1careers.com/images/Banner1.png',
        alt: 'Image 1'
    },
    {
        src: 'https://g1careers.com/images/Banner2.png',
        alt: 'Image 2'
    },
    {
        src: 'https://g1careers.com/images/Banner3.png',
        alt: 'Image 3'
    }
];

export default function Carousal() {
    const theme = useTheme();

    return (
        <Carousel >
            {items.map((item, index) => (
                <Paper key={index} style={{ position: 'relative', height: '300px', paddingTop: '50%', overflow: 'hidden'  }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <img
                            src={item.src}
                            alt={item.alt}
                            style={{
                                width: '100%',
                                maxHeight: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                </Paper>
            ))}
        </Carousel>
    );
}
