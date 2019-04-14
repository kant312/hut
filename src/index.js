import Hut from './hut/hut';

const app = new Hut({
	tpl: '<h1>hello {{ foo }}</h1>',
	ctx: () => ({
		foo: 'world',
	})
});
