
export class CString {
  /**
   * Checks if a string contains at least one visible character.
   * @param input value to evaluate.
   * @returns false if the given input is not a string or doesn't contain a printable visible character, otherwise true.
   */
  static isNullOrWhiteSpace(input: string): boolean {
    return !input || !(typeof(input) === 'string') || input.replace(/\s/g, '').length < 1;
  }
  /**
   * Checks if a string repects the email format.
   * @param input value to evaluate.
   * @returns false if the given input is not a string or is not a valid email, otherwise true.
   */
  static IsValidEmail(input: string): boolean {
    return (typeof(input) === 'string') && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input);
  }
  /**
   * Checks if an input is password correctly formatted.
   * @param input value to evaluate.
   * @returns false if the given input is not a string or is not a valid email, otherwise true.
   */
  static IsValidPassword(input): boolean {
    return (this.isNullOrWhiteSpace(input) === false) && (/^(\s|.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(input) === false);
  }
}
