import { defineHook } from '@directus/extensions-sdk';
import axios from 'axios';

export default defineHook(({ filter, action, schedule }, { getSchema, services, database }) => {
	const { ItemsService } = services;
	filter('trasaction.items.update', async (payload: any, meta, context) => {
		const trasactionService = new ItemsService('trasaction', {
			schema: await getSchema(),
			accountability: context.accountability
		});

		const data = await trasactionService.readOne(meta.keys[0]);
		return {
			...payload,
			oldTotal: data.total,
			oldType: data.type
		}
	});
	action('trasaction.items.update', async (handler, context) => {
		const trasactionService = new ItemsService('trasaction', {
			schema: await getSchema(),
			accountability: context.accountability
		});

		const accountService = new ItemsService('account', {
			schema: await getSchema(),
			accountability: context.accountability
		});

		const transaction = await trasactionService.readOne(handler.keys[0]);

		if (transaction.total != handler.payload.oldTotal || transaction.type != handler.payload.oldType) {
			const account = await accountService.readOne(transaction.account_id);
			const newMoney = (transaction.type == "expenses") ? -1 * transaction.total : transaction.total
			const oldMoney = (handler.payload.oldType == "expenses") ? -1 * handler.payload.oldTotal : handler.payload.oldTotal
			account.total = account.total - oldMoney + newMoney;
			await accountService.updateOne(transaction.account_id, account);
		}
	});
	action('trasaction.items.create', async (handler, context) => {
		const accountService = new ItemsService('account', {
			schema: await getSchema(),
			accountability: context.accountability
		});
		console.log({handler})
		const account = await accountService.readOne(handler.payload.account_id);
		const total = (handler.payload.type == "expenses") ? -1 * handler.payload.total : handler.payload.total
		account.total = account.total +total
		await accountService.updateOne(account.id, account);
	});

	filter('trasaction.items.delete', async (payload: any, meta, context) => {
		const accountService = new ItemsService('account', {
			schema: await getSchema(),
			accountability: context.accountability
		});
		const trasactionService = new ItemsService('trasaction', {
			schema: await getSchema(),
			accountability: context.accountability
		});
		const transaction = await trasactionService.readOne(payload[0]);
		const account = await accountService.readOne(transaction.account_id);
		const total = (transaction.type == "expenses") ? -1 * transaction.total : transaction.total
		account.total = account.total - total
		await accountService.updateOne(account.id, account);
	});
});
