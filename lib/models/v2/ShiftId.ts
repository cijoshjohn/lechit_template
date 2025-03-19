/** An ID for a shift. Shifts are for a day, and have a qualifier (e.g. AM/PM) */
class ShiftId {
  /** The date of the shift. This is stored as a string in 'YYYY-MM-DD' format */
  date;
  /** The qualifier, to distinguish multiple shifts within a day. */
  qualifier;

  constructor(date, qualifier) {
    this.date = date;
    this.qualifier = qualifier;
  }

  /** Get a string representation of the shift id. This will `YYYYMMDD<qualifier>` */
  toString() {
    return `${this.date}${this.qualifier}`;
  }

  /**
   * Build a ShiftId from a string.
   * @returns {ShiftId}
   */
  static fromString(value) {
    const regex = /(?<date>\d\d\d\d\d\d\d\d)(?<qualifier>\w)/;
    const matches = value.match(regex);
    return new ShiftId(matches.groups.date, matches.groups.qualifier);
  }
}

export default ShiftId;
