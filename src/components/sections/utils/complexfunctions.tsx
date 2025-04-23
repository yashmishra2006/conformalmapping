// Complex number utilities and functions for the interactive applet

export type ComplexNumber = { re: number; im: number };

export const add = (z1: ComplexNumber, z2: ComplexNumber): ComplexNumber => ({
  re: z1.re + z2.re,
  im: z1.im + z2.im
});

export const multiply = (z1: ComplexNumber, z2: ComplexNumber): ComplexNumber => ({
  re: z1.re * z2.re - z1.im * z2.im,
  im: z1.re * z2.im + z1.im * z2.re
});

export const inverse = (z: ComplexNumber): ComplexNumber => {
  const denominator = z.re * z.re + z.im * z.im;
  if (denominator === 0) return { re: 0, im: 0 };
  return {
    re: z.re / denominator,
    im: -z.im / denominator
  };
};

export const divide = (z1: ComplexNumber, z2: ComplexNumber): ComplexNumber => {
  const denominator = z2.re * z2.re + z2.im * z2.im;
  if (denominator === 0) return { re: 0, im: 0 };
  return {
    re: (z1.re * z2.re + z1.im * z2.im) / denominator,
    im: (z1.im * z2.re - z1.re * z2.im) / denominator
  };
};

export const power = (z: ComplexNumber, n: number): ComplexNumber => {
  const r = Math.sqrt(z.re * z.re + z.im * z.im);
  const theta = Math.atan2(z.im, z.re);
  const newR = Math.pow(r, n);
  const newTheta = n * theta;
  
  return {
    re: newR * Math.cos(newTheta),
    im: newR * Math.sin(newTheta)
  };
};

export const logarithm = (z: ComplexNumber): ComplexNumber => {
  const r = Math.sqrt(z.re * z.re + z.im * z.im);
  const theta = Math.atan2(z.im, z.re);
  return {
    re: Math.log(r),
    im: theta
  };
};

export const exponential = (z: ComplexNumber): ComplexNumber => {
  const expReal = Math.exp(z.re);
  return {
    re: expReal * Math.cos(z.im),
    im: expReal * Math.sin(z.im)
  };
};

export const sin = (z: ComplexNumber): ComplexNumber => {
  const iz = { re: -z.im, im: z.re };
  const negIz = { re: z.im, im: -z.re };
  
  const ePosIz = exponential(iz);
  const eNegIz = exponential(negIz);
  
  return {
    re: (ePosIz.im - eNegIz.im) / 2,
    im: (ePosIz.re - eNegIz.re) / 2
  };
};

export const cos = (z: ComplexNumber): ComplexNumber => {
  const iz = { re: -z.im, im: z.re };
  const negIz = { re: z.im, im: -z.re };
  
  const ePosIz = exponential(iz);
  const eNegIz = exponential(negIz);
  
  return {
    re: (ePosIz.re + eNegIz.re) / 2,
    im: (ePosIz.im + eNegIz.im) / 2
  };
};

export const joukowski = (z: ComplexNumber, a: number = 1): ComplexNumber => {
  const aSquared = a * a;
  const aSquaredOverZ = divide({ re: aSquared, im: 0 }, z);
  return add(z, aSquaredOverZ);
};

export type ComplexFunction = (z: ComplexNumber) => ComplexNumber;

export const functions: Record<string, ComplexFunction> = {
  identity: (z: ComplexNumber) => z,
  square: (z: ComplexNumber) => power(z, 2),
  inverse: inverse,
  logarithm: logarithm,
  exponential: exponential,
  sine: sin,
  cosine: cos,
  joukowski: (z: ComplexNumber) => joukowski(z, 1)
};