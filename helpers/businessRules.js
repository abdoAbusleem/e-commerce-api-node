class BusinessRules {
  static validatePriceLogic(price, priceAfterDiscount) {
    if (priceAfterDiscount && priceAfterDiscount >= price) {
      return 'Price after discount must be lower than original price';
    }
    return null;
  }

  static validateInventoryLogic(quantity, sold) {
    if (sold > quantity) {
      return 'Sold quantity cannot exceed available quantity';
    }
    return null;
  }
}
module.exports = BusinessRules;
