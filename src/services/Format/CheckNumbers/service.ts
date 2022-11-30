import formatter from "../Price/service";

const checkNumbers = (number: string) => (number ? formatter(number) : "---");

export default checkNumbers;
