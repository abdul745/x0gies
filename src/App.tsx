import { Toaster } from "react-hot-toast";
import Routes from "./routes/index";

import {
  ThirdwebProvider,
  metamaskWallet,
  walletConnect,
  en,
  coinbaseWallet,
} from "@thirdweb-dev/react";
function App() {
  return (
    <ThirdwebProvider
      clientId={"6fedb8fe8f2539cec10586b6a583e2db"}
      secretKey={
        "ft-HEvJIjsAlm2qD_kTKK9AKMr4gc1xd4INn-UpZZ-kLYYDfU2sgg_0Vr4Jy2YudLbntqQwTqKbKp_lblgAvvQ"
      }
      locale={en()}
      supportedWallets={[metamaskWallet(), walletConnect(), coinbaseWallet()]}
    >
      <Routes />
      <Toaster />
    </ThirdwebProvider>
    
  );
}

export default App;
