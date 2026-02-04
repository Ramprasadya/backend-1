import { useState } from "react";
import { useCurrencyInfo } from "./hooks/useCurrencyInfo";

const App = () => {
	const [ammount, setAmmount] = useState(0)
	const [from, setFrom] = useState("usd")
	const [to, setTo] = useState("inr")
	const [convertedAmmount, setConvertedAmmount] = useState(0)

	const currencyInfro = useCurrencyInfo(from)
	return (
		<div className="min-h-screen flex flex-col bg-black text-white/95 items-center justify-center text-2xl font-bold text-center">
			<img
				className="size-40"
				src="https://res.cloudinary.com/dltj8bim0/image/upload/v1761060580/logo_kukwt0.png"
				alt=""
			/>
			<p>Hello Vite + React + TailwindCSS!</p>
		</div>
	);
};

export default App;
