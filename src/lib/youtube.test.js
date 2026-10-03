import { parseDuration, formatDuration, formatCount, filterLongForm } from './youtube';

describe('parseDuration', () => {
  it.each([
    ['PT12M34S', 754],
    ['PT1H2M3S', 3723],
    ['PT45S', 45],
    ['PT3M', 180],
    ['PT2H', 7200],
    ['P1DT1S', 86401],
    ['P0D', 0],
    ['', 0],
    [undefined, 0],
    ['garbage', 0],
  ])('%s -> %i', (iso, seconds) => {
    expect(parseDuration(iso)).toBe(seconds);
  });
});

describe('formatDuration', () => {
  it.each([
    [0, '0:00'],
    [59, '0:59'],
    [754, '12:34'],
    [3723, '1:02:03'],
    [undefined, '0:00'],
  ])('%s -> %s', (s, out) => {
    expect(formatDuration(s)).toBe(out);
  });
});

describe('formatCount', () => {
  it.each([
    [0, '0'],
    [950, '950'],
    [1000, '1k'],
    [3612, '3.6k'],
    [12400, '12k'],
    [182000, '182k'],
    [999600, '1M'],
    [1250000, '1.3M'],
    ['3612', '3.6k'],
    [null, '0'],
    [NaN, ''],
  ])('%s -> %s', (n, out) => {
    expect(formatCount(n)).toBe(out);
  });
});

describe('filterLongForm', () => {
  it('drops Shorts (3 minutes or less) and keeps longer videos', () => {
    const videos = [
      { id: 'short', durationSeconds: 45 },
      { id: 'edge', durationSeconds: 180 },
      { id: 'long', durationSeconds: 181 },
      { id: 'longer', durationSeconds: 900 },
    ];
    expect(filterLongForm(videos).map((v) => v.id)).toEqual(['long', 'longer']);
  });

  it('handles missing input', () => {
    expect(filterLongForm(undefined)).toEqual([]);
  });
});
