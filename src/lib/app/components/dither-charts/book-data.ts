export interface BookPage {
	id: string;
	title: string;
	src: string;
}

export interface BookSettings {
	padding: number;
	imageRadius: number;
	creaseOpacity: number;
	paperColor: string;
	shadowIntensity: number;
}

export const PAGES: BookPage[] = [
	{
		id: '1',
		title: 'SKETCH 01',
		src: 'https://i.pinimg.com/736x/9a/63/20/9a632012291e49436b7695f50d8aa20e.jpg'
	},
	{
		id: '2',
		title: 'SKETCH 02',
		src: 'https://i.pinimg.com/736x/0c/e1/6e/0ce16e5cfb36927669b7421c670035e0.jpg'
	},
	{
		id: '3',
		title: 'SKETCH 03',
		src: 'https://i.pinimg.com/736x/63/16/b2/6316b20446639cd7f923882cc0d5b0a5.jpg'
	},
	{
		id: '4',
		title: 'SKETCH 04',
		src: 'https://i.pinimg.com/736x/8b/36/b9/8b36b9f128dd0a65dc260e323ac5e333.jpg'
	},
	{
		id: '5',
		title: 'SKETCH 05',
		src: 'https://i.pinimg.com/736x/10/b6/bf/10b6bfda558137d1fd3fe5089c36ad9c.jpg'
	},
	{
		id: '6',
		title: 'SKETCH 06',
		src: 'https://i.pinimg.com/736x/f9/a7/d1/f9a7d15098baeb3ea28d7232f4ac86ea.jpg'
	}
];
