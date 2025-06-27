
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, IndianRupee, Wallet, ArrowDown } from "lucide-react";

const PaymentForm = () => {
  const navigate = useNavigate();
  const [upiId, setUpiId] = useState("");
  const [selectedToken, setSelectedToken] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [inrAmount, setInrAmount] = useState("");

  const tokens = [
    { symbol: "USDT", name: "Tether", icon: "💎", rate: 83.2, balance: "2,456.78" },
    { symbol: "ETH", name: "Ethereum", icon: "🔷", rate: 209340, balance: "0.845" },
    { symbol: "SOL", name: "Solana", icon: "🟣", rate: 1974, balance: "45.32" }
  ];

  const selectedTokenData = tokens.find(t => t.symbol === selectedToken);
  const networkFee = "0.5";
  const platformFee = "1.2";
  const totalFee = parseFloat(networkFee) + parseFloat(platformFee);

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value && selectedTokenData) {
      const inr = (parseFloat(value) * selectedTokenData.rate).toLocaleString('en-IN');
      setInrAmount(inr);
    } else {
      setInrAmount("");
    }
  };

  const handleConfirm = () => {
    if (upiId && amount && selectedToken) {
      navigate('/confirmation', { 
        state: { 
          upiId, 
          amount, 
          selectedToken, 
          inrAmount,
          totalFee: totalFee.toString()
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-crypto-dark via-crypto-gray to-crypto-dark p-4">
      {/* Header */}
      <div className="max-w-md mx-auto mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">Send Payment</h1>
            <p className="text-gray-400 text-sm">Send crypto to UPI instantly</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Recipient Details */}
        <Card className="glass-dark border-0 animate-in">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center">
              <IndianRupee className="w-5 h-5 mr-2 text-neon-green" />
              Recipient Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="upi" className="text-gray-300">UPI ID</Label>
              <Input
                id="upi"
                placeholder="example@paytm / phonepe / gpay"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="mt-1 bg-crypto-gray border-gray-600 text-white placeholder-gray-500 focus:border-neon-blue"
              />
            </div>
          </CardContent>
        </Card>

        {/* Token Selection */}
        <Card className="glass-dark border-0 animate-in">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center">
              <Wallet className="w-5 h-5 mr-2 text-neon-blue" />
              Select Token
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedToken} onValueChange={setSelectedToken}>
              <SelectTrigger className="bg-crypto-gray border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-crypto-gray border-gray-600">
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol} className="text-white hover:bg-gray-700">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{token.icon}</span>
                      <div>
                        <p className="font-medium">{token.symbol}</p>
                        <p className="text-xs text-gray-400">Balance: {token.balance}</p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-xs text-gray-400">
                          ₹{token.rate.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Amount Input */}
        <Card className="glass-dark border-0 animate-in">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount" className="text-gray-300">
                  Amount ({selectedToken})
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="mt-1 bg-crypto-gray border-gray-600 text-white text-xl font-semibold text-center focus:border-neon-blue"
                />
              </div>
              
              {inrAmount && (
                <div className="text-center">
                  <ArrowDown className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                  <div className="p-4 rounded-lg glass">
                    <p className="text-2xl font-bold text-neon-green">
                      ₹{inrAmount}
                    </p>
                    <p className="text-gray-400 text-sm">
                      @ ₹{selectedTokenData?.rate.toLocaleString('en-IN')} per {selectedToken}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Fee Breakdown */}
        {amount && (
          <Card className="glass-dark border-0 animate-in">
            <CardHeader>
              <CardTitle className="text-white text-sm">Fee Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Network Fee</span>
                <span className="text-white">{networkFee} {selectedToken}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Platform Fee</span>
                <span className="text-white">{platformFee} {selectedToken}</span>
              </div>
              <div className="border-t border-gray-600 pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">Total Fee</span>
                  <span className="text-neon-blue">{totalFee} {selectedToken}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Confirm Button */}
        <Button
          onClick={handleConfirm}
          disabled={!upiId || !amount || !selectedToken}
          className="w-full bg-gradient-neon hover:opacity-90 text-white font-medium py-4 rounded-xl transition-all duration-300 disabled:opacity-50"
          size="lg"
        >
          <div className="flex items-center justify-center space-x-2">
            <span>Confirm & Pay</span>
            {amount && (
              <Badge className="bg-white/20">
                {amount} {selectedToken}
              </Badge>
            )}
          </div>
        </Button>

        {/* Security Notice */}
        <div className="text-center p-4 glass-dark rounded-xl">
          <p className="text-gray-400 text-xs">
            🔒 Your transaction is secured with end-to-end encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
