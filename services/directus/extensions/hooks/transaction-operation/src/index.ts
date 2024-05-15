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
			const newMoney = (transaction.type == "expenses") ? -1 * transaction.total : 1 * transaction.total
			const oldMoney = (handler.payload.oldType == "expenses") ? -1 * handler.payload.oldTotal : 1 * handler.payload.oldTotal
			account.total = account.total - oldMoney + newMoney;
			await accountService.updateOne(transaction.account_id, account);
		}
	});
	action('trasaction.items.create', async (handler, context) => {
		const accountService = new ItemsService('account', {
			schema: await getSchema(),
			accountability: context.accountability
		});
		console.log({ handler })
		const account = await accountService.readOne(handler.payload.account_id.id || handler.payload.account_id);
		const total = (handler.payload.type == "expenses") ? -1 * handler.payload.total : 1 * handler.payload.total
		account.total = account.total + total
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
		const total = (transaction.type == "expenses") ? -1 * transaction.total : 1 * transaction.total
		account.total = account.total - total
		await accountService.updateOne(account.id, account);
	});

	action('transfer_history.items.create', async (handler, context) => {
		const accountService = new ItemsService('account', {
			schema: await getSchema(),
			accountability: context.accountability
		});
		const trasactionService = new ItemsService('trasaction', {
			schema: await getSchema(),
			accountability: context.accountability
		});

		const notiService = new ItemsService('notification', {
			schema: await getSchema(),
			accountability: context.accountability
		});



		const fromAccount = await accountService.readOne(handler.payload.from_acc.id);
		const toAccount = await accountService.readOne(handler.payload.to_acc.id);
		
		await trasactionService.createOne({
			name: `[Transfer] Send to ${toAccount.name}`,
			total: handler.payload.amount,
			trading_date: handler.payload.date,
			account_id: handler.payload.from_acc.id,
			type: 'expenses',
			category: 'Chuyển tiền',
			description: `Transfer from ${fromAccount.name} to ${toAccount.name} `,
		});

		await trasactionService.createOne({
			name: `[Transfer] Receive from ${fromAccount.name} `,
			total: handler.payload.amount,
			trading_date: handler.payload.date,
			category: 'Chuyển tiền',
			type: 'income',
			account_id: handler.payload.to_acc.id,
			description: `Transfer from ${fromAccount.name} to ${toAccount.name} `,
		});

		await notiService.createOne({
			title: `New transfer from your account`,
			message : `Transfer ${handler.payload.amount} VND from account ${fromAccount.name} to account ${toAccount.name}`,
			user_id : fromAccount.user_id
		});
	});
});
