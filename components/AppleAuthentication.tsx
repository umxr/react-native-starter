import * as AppleAuthentication from 'expo-apple-authentication';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import useAppleAuth from '../hooks/useAppleAuth';

export default function AppleAuth() {
	const { checkAppleAuthAvailability, signIn, user } = useAppleAuth();
	const [render, setRender] = useState<boolean>(false);

	useEffect(() => {
		const run = async () => {
			const res = await checkAppleAuthAvailability();
			if (res) {
				setRender(true);
			}
		};
		run();
	}, []);

	if (render && !user) {
		return (
			<>
				<AppleAuthentication.AppleAuthenticationButton
					buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
					buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
					style={{
						width: 200,
						height: 44,
					}}
					onPress={signIn}
				/>
				<View
					style={styles.separator}
					lightColor='#eee'
					darkColor='rgba(255,255,255,0.1)'
				/>
			</>
		);
	}

	return null;
}

const styles = StyleSheet.create({
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
