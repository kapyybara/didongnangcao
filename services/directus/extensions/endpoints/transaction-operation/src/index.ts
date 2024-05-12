import { defineEndpoint } from '@directus/extensions-sdk';

export default defineEndpoint((router, context) => {
	const { services, getSchema } = context;
	const { ItemsService } = services;
	router.post('/payment_cronjob', async (req, res) => {
		console.log(req.params);

		const transactionsService = new ItemsService('trasaction', {
			schema: await getSchema(),
			accountability: req?.accountability
		});
		const notiService = new ItemsService('notification', {
			schema: await getSchema(),
			accountability: req?.accountability
		});
		const paymentService = new ItemsService('payment', {
			schema: await getSchema(),
			accountability: req?.accountability
		});

		const payments : [] = await paymentService.readByQuery({
			fields: ['*', "account_id.*"],
			filter: {
				to: {
					_gte: new Date()
				},
				from: {
					_lte: new Date()
				}
			}
		})

		await Promise.all(payments.map( async (payment:any)=>{
			var lastDate = new Date(payment.last_payment_date || payment.from)
			console.log(payment.account_id.user_id)


			if (diffDays(lastDate, new Date()) >= payment.cycle_day) {

				await notiService.createOne({
					title: `Regular payment for ${payment.name}`,
					message : `Your regular payment cycle (${payment.cycle_day}) ${payment.name} is comming`,
					user_id : payment.account_id.user_id
				});

				await paymentService.updateOne(payment.id, {
					last_payment_date : new Date()
				});
				
				if (payment.add_automation){
					await transactionsService.createOne({
						name: `[Regular payment] ${payment.name}`,
						total: payment.total ,
						trading_date: new Date(),
						account_id: payment.account_id , 
						type : payment.type , 
						category:  payment.category, 
						description : `Automation transaction for regular payment ${payment.name}`,
					});
				}
			}

		}))


		res.send({ payments: payments })
	})
});


function diffDays(date1: Date, date2: Date): number {
    const time1 = date1.getTime();
    const time2 = date2.getTime();
    const diffTime = Math.abs(time2 - time1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}