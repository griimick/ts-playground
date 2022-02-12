// Bits: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
// Type: S E E E E E E M M M M  M  M  M  M  M

const EXP_BITS = 5;
const MANTISSA_BITS = 10;
const NON_SIGN_BITS = EXP_BITS + MANTISSA_BITS;

const encode = n => {
	const sign = Math.sign(1 / n) === -1 ? 1 : 0; // Use Infinity sign as Math.sign(-0) = -0 instead of -1

	if (n === 0) {
		return sign  === 0 ? 0 : (1 << NON_SIGN_BITS);
	}
	
	let exponent = Math.floor(Math.log(Math.abs(n)) / Math.log(2));
	const lower = 2 ** exponent;
	const upper = 2 ** (exponent + 1);
	exponent = (exponent + 15) & 0b11111; // 

	const percentage = (Math.abs(n) - lower) / (upper - lower);
	const mantissa = 1024 * percentage;

	return (sign << NON_SIGN_BITS) | (exponent << MANTISSA_BITS) | mantissa;
}

const decode = n => {
	const sign     = (n & 0b1000000000000000) >> NON_SIGN_BITS;
	const exponent = (n & 0b0111110000000000) >> MANTISSA_BITS;
	const mantissa = (n & 0b0000001111111111);

	if (exponent === 0 && mantissa === 0) {
		return sign === -1 ? -0 : 0;
	}

	if (exponent === 0b11111) {
		if (mantissa === 0) {
			return sign === 0 ? Infinity : -Infinity;
		} else {
			return NaN;
		}
	}

	// denormalised check. if exponent 0 then whole part is also 0
	const wholePart = exponent === 0 ? 0 : 1;

	const percentage = mantissa / 1024;

	return (-1)**sign * (wholePart + percentage) * 2 ** (exponent - 15); //TODO: why 15 substraction
}

const original = 12.52571;
const encoded = encode(original);
const decoded = decode(encoded);
const inifinityCheck = decode(0b0111110000000000);
const minusInifinityCheck = decode(0b1111110000000000);
const nanCheck = decode(0b1111110000000001);

console.log(`original: ${original}`);
console.log(`encoded: ${encoded}`);
console.log(`encoded bits: ${encoded.toString(2)}`);
console.log(`decoded: ${decoded}`);
console.log(`infinity: ${inifinityCheck}`);
console.log(`-infinity: ${minusInifinityCheck}`);
console.log(`nanCheck: ${nanCheck}`);

// Special cases
// NaN 0/0, 1/0 nfinity, -1/0 -Infinity
// 0 sign=0 exponent=00000 mantissa=0000000000
// -0  sign=1 exponent=00000 mantissaa=0000000000
// Inifinity sign=0 exponent=11111 mantissa=0000000000 (highest exponent, zero mantissa)
// -Inifinity sign=1 exponent=11111 mantissa=0000000000 (highest exponent, zero mantissa)
// NaN Sign=0 Exponent=11111 mantissa=0101010101 (highest exponent, non-zero mantissa)
// The non zero mantissa can have different values depending unpon what caused NaN to originate

// TODO: There is something called denormalised number. Why is it?