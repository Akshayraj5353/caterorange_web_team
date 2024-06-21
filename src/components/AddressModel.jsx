export default class AddressModel {
    constructor(full_address = '', pincode = '', latitude = '', longitude = '', contact_number = '', state = '', nearby_location = '') {
      this.full_address = full_address;
      this.pincode = pincode;
      this.latitude = latitude;
      this.longitude = longitude;
      this.contact_number = contact_number;
      this.state = state;
      this.nearby_location = nearby_location;
    }
  }
  