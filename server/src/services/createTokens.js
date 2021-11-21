import { sign } from 'jsonwebtoken';

export const createAccessToken = (payload) => {
	return sign(payload, process.env.ACCESS_TOKEN, {
		expiresIn: '5m',
	});
};

export const createRefreshToken = (payload) => {
	return sign(payload, process.env.REFRESH_TOKEN, {
		expiresIn: '7d',
	});
};