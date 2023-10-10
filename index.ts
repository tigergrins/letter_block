import dayjs from "dayjs";
import { Event, Sphere } from "./helpers/types";
import { icons } from "./helpers/icons";
import { getDateString, getFormattedInterval, titles } from "./helpers/utils";
import { styles } from "./helpers/styles";


const getItems = (event: Event) => {
	const dates = getFormattedInterval(
		dayjs(event.startDate).format('DD.MM.YYYY HH:mm:ss'),
		dayjs(event.endDate).format('DD.MM.YYYY HH:mm:ss'),
	)

	const daysAhead = getDateString(event.startDate, event.endDate)

	return (
		`<div style="${styles.item}">
			<div style="${styles.title}">
				${event.title}
			</div>

			<div style="${styles.description}">
				<div style="${styles.date}">
				${
					event.duration === 'long'
						? `<div style="${styles.icon}">${icons.duration}</div>`
						: ''
					}

					<div>
						${dates} &bull; ${daysAhead.text}
					</div>
				</div>

				${icons.tension}
			</div>
		</div>`
	)
}

export const getBlock = (events: Event[]) => {
	const sphere: Sphere = events[0].sphere
	const items = events.map(event => getItems(event)).join('')

	return (
		`<div style="${styles.block}">
			<div style="${styles.header}">
				<div style="${styles.icon}">${icons.events[sphere]}</div>
				<div style="${styles.title} ${styles.spheres[sphere]}">${titles[sphere]}</div>
			</div>

			<div>
				${items}
			</div>
		</div>`
	)
}
