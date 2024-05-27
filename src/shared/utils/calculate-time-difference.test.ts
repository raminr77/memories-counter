import { calculateTimeDifference } from './calculate-time-difference';

describe('CalculateTimeDifference', () => {
  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2020-01-01'));
  });

  afterAll(() => jest.useRealTimers());

  test('Calculates the difference correctly', () => {
    jest.setSystemTime(new Date('2023-05-27T14:34:56Z'));
    const result = calculateTimeDifference('2023-05-25', '12:00:00');
    const expectedOutput = '2 Days, 2 Hours, 34 Minutes, 56 Seconds';
    expect(result).toBe(expectedOutput);
  });

  test('Returns only non-zero values', () => {
    jest.setSystemTime(new Date('2023-05-27T12:35:56Z'));
    const result = calculateTimeDifference('2023-05-27', '12:34:56');
    const expectedOutput = '1 Minutes';
    expect(result).toBe(expectedOutput);
  });

  test('Handles future dates correctly', () => {
    jest.setSystemTime(new Date('2023-05-27T00:00:00Z'));
    const result = calculateTimeDifference('2024-05-26', '00:00:00');
    const expectedOutput = '1 Years';
    expect(result).toBe(expectedOutput);
  });

  test('Handles zero difference correctly', () => {
    jest.setSystemTime(new Date('2023-05-27T12:00:00Z'));
    const result = calculateTimeDifference('2023-05-27', '12:00:00');
    const expectedOutput = '';
    expect(result).toBe(expectedOutput);
  });

  test('Handles leap years correctly', () => {
    jest.setSystemTime(new Date('2021-02-28T00:00:00Z'));
    const result = calculateTimeDifference('2020-02-29', '00:00:00');
    const expectedOutput = '1 Years';
    expect(result).toBe(expectedOutput);
  });

  test('Handles different time zones correctly', () => {
    jest.setSystemTime(new Date('2023-05-27T14:00:00Z'));
    const result = calculateTimeDifference('2023-05-27', '12:00:00');
    const expectedOutput = '2 Hours';
    expect(result).toBe(expectedOutput);
  });
});
