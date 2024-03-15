class HelperXprz {
  constructor() {
    // Require the 'xprz' module
    const xprz = require("xprz");

    // Destructure the 'Route' class from the 'xprz' module
    const { Route } = new xprz();

    // Assign the 'Route' class to the 'Route' property of this class instance
    this.Route = Route;
  }

  /**
   * Returns the 'Route' class.
   * @returns {Class} Route - The Route class from the 'xprz' module.
   */
  Route() {
    // Returns the 'Route' class
    return this.Route;
  }
}

// Export a new instance of the HelperXprz class
module.exports = new HelperXprz();
