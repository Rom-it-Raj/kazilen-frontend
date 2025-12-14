import "./globals.css";
import ConditionalHeader from "./components/ConditionalHeader";
import ConditionalBottomNav from "./components/ConditionalBottomNav";

export const metadata = {
	title: "Kazilen",
	description: "Rom writing ya disc",
};

export default function RootLayout({ children }) {
	return (
		<html>
			<body>
				<ConditionalHeader />
				{children}
				<ConditionalBottomNav />
			</body>
		</html>
	);
}
