import { defineEndpoint } from '@directus/extensions-sdk';

export default defineEndpoint((router, context) => {
	const { services, getSchema } = context;
	const { ItemsService } = services;
	router.post('/payment_cronjob', async (req, res) => {
		console.log(req.params);

		// const transactionsService = new ItemsService('trasaction', {
		// 	schema: await getSchema(),
		// 	accountability: req?.accountability
		// });
		const paymentService = new ItemsService('payment', {
			schema: await getSchema(),
			accountability: req?.accountability
		});

		const payment = paymentService.readByQuery({
			fields: ['*'],
			filter: {
				to: {
					_lte: "$NOW"
				},
				from: {
					_gte: "$NOW"
				}
			}
		})

		// console.log(payment);
		res.send({ payments: payment })

	})
});
