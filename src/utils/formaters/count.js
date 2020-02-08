// @flow

const createCountFormatter = ({
  few,
  one,
  two
}: {|
  few: string,
  one: string,
  two: string
|}) => {
  const titles = [one, two, few];

  return (number: number): string => {
    const cases = [2, 0, 1, 1, 1, 2];

    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };
};

export const formatAudioCount = createCountFormatter({
  few: "Аудиозаписей",
  one: "Аудиозапись",
  two: "Аудиозаписи"
});
