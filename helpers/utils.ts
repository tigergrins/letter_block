import dayjs from "dayjs";
import { Sphere } from "./types";

export const getFormattedInterval = (start: string, end: string, full: boolean = false) => {
  const _s = dayjs(start, 'DD.MM.YYYY HH:mm:ss');
  const _e = dayjs(end, 'DD.MM.YYYY HH:mm:ss');
  if(full) {
    return `${_s.format('D MMM, hh:mm')} — ${_e.format('D MMM, hh:mm')}`;
  }
  if(_s.isSame(_e, 'year')) {
    const isThisYear = dayjs().isSame(_s, 'year');
    if(_s.isSame(_e, 'month')) {
      return `${_s.format('D')}–${_e.format(isThisYear ? 'D MMM' : 'D MMMM YYYY')}`;
    }
    return `${_s.format('D MMM')} — ${_e.format(isThisYear ? 'D MMM' : 'D MMM YYYY')}`;
  }
  return `${_s.format('D MMM YYYY')} — ${_e.format('D MMM YYYY')}`;
}

export const getAmount = (number: number, returnStr: boolean = false) => {
  if (number > 365) {
    const amount = Math.trunc(number / 365)
    return returnStr ? `${amount}+` : amount
  }

  if (number > 30) {
    const amount = Math.trunc(number / 31)
    return returnStr ? `${amount}+` : amount
  }

  return number
}

export const getDaysWord = (number: number, onlyWord: boolean = false) => {
	if(number === 0) return 'Последний день';
	if(number < 0) return 'Уже прошло';

	const periods = {
		day: ['день', 'дня', 'дней'],
		month: ['месяц', 'месяца', 'месяцев'],
		hour: ['час', 'часа', 'часов'],
		week: ['неделя', 'недели', 'недель'],
		year: ['год', 'года', 'лет'],
	};

	const cases = [2, 0, 1, 1, 1, 2];

	const getWord = () => {
		let date = number
		let period: string[]

		if (number < 31) {
			period = periods.day
		} else if (number < 365) {
			date = Math.floor(number / 31)
			period = periods.month
		} else {
			date = Math.floor(number / 365)
			period = periods.year
		}

		return period[
			date % 100 > 4 && date % 100 < 20
				? 2
				: cases[
						date % 10 < 5
							? date % 10
							: 5
						]
			]
	}

	if(!onlyWord) {
		return `еще ${getAmount(number, true)} ${getWord()}`
	} else {
		return getWord()
	}
}

export const getDateString = (from: string, to: string) => {
  const first = dayjs(from);
  const last = dayjs(to);
	const today = dayjs();

  if (first.startOf('day').isSame(today.startOf('day'))) {
    return {
      new: true,
      text: 'Новое'
    };
  }

  const daysAhead = dayjs(last).startOf('day').diff(today.startOf('day'), 'day') + 1;

  return {
    new: false,
    text: `${getDaysWord(daysAhead)}`
  };
}

export const titles: Record<Sphere, string> = {
	emotions: 'Эмоции',
	love: 'Любовь',
	communication: 'Общение',
	career: 'Карьера',
	finance: 'Финансы',
	health: 'Здоровье',
	travel: 'Поездки',
}
