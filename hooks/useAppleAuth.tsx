import { useCallback, useEffect, useState } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';

export default function useAppleAuth() {
	const [user, setUser] =
		useState<null | AppleAuthentication.AppleAuthenticationCredential>(null);

	useEffect(() => {
		const run = async () => {};
		run();
	}, []);

	const signIn = async () => {
		try {
			const res = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});
			setUser(res);
		} catch (error: any) {
			if (error.code === 'ERR_CANCELED') {
				// handle that the user canceled the sign-in flow
			} else {
				// handle other errors
			}
			setUser(null);
			console.log(error);
		}
	};

	const signOut = async (user: string) => {
		try {
			await AppleAuthentication.signOutAsync({
				user,
			});
			setUser(null);
		} catch (error) {
			console.log(error);
		}
	};

	const checkAppleAuthAvailability = async () => {
		try {
			return AppleAuthentication.isAvailableAsync();
		} catch (error) {
			console.log(error);
		}
	};

	return {
		user,
		signIn,
		signOut,
		checkAppleAuthAvailability,
	};
}
