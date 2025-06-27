
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, ArrowUp, Copy, CheckCircle, Circle, IndianRupee } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(true);

  const recentTransactions = [
    {
      id: "1",
      upiId: "john@paytm",
      amount: "₹5,000",
      token: "USDT",
      status: "Complete",
      hash: "0x1a2b3c...",
      time: "2 mins ago"
    },
    {
      id: "2", 
      upiId: "priya@phonepe",
      amount: "₹12,500",
      token: "ETH",
      status: "Pending",
      hash: "0x4d5e6f...",
      time: "8 mins ago"
    },
    {
      id: "3",
      upiId: "rajesh@gpay",
      amount: "₹8,200",
      token: "SOL",
      status: "Complete", 
      hash: "0x7g8h9i...",
      time: "1 hour ago"
    }
  ];

  const walletBalances = [
    { token: "USDT", balance: "2,456.78", value: "₹2,04,321", icon: "💎" },
    { token: "ETH", balance: "0.845", value: "₹1,76,892", icon: "🔷" },
    { token: "SOL", balance: "45.32", value: "₹89,456", icon: "🟣" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-base via-glass-surface to-dark-base p-4 sm:p-6">
      {/* Header */}
      <div className="max-w-md mx-auto mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-light-text neon-text">CryptoUPI</h1>
          <Badge 
            variant={walletConnected ? "default" : "destructive"}
            className={`glass ${walletConnected ? 'bg-gradient-success text-white' : 'bg-neon-red text-white'}`}
          >
            <Wallet className="w-3 h-3 mr-1" />
            {walletConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
        <p className="text-gray-400 text-sm">Power UPI with Crypto</p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Main Action Card */}
        <Card className="glass-dark border-0 hover-lift animate-in">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-neon flex items-center justify-center animate-pulse-neon">
                <ArrowUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-light-text mb-2">Send Crypto to UPI</h2>
              <p className="text-gray-400 text-sm">
                Send USDT, ETH, SOL directly to any Indian bank account
              </p>
            </div>
            <Button 
              onClick={() => navigate('/payment')}
              className="w-full bg-gradient-neon hover:opacity-90 text-white font-medium py-3 rounded-xl transition-all duration-300"
              size="lg"
            >
              Start Payment
            </Button>
          </CardContent>
        </Card>

        {/* Wallet Balances */}
        <Card className="glass-dark border-0 animate-in">
          <CardHeader>
            <CardTitle className="text-light-text text-lg flex items-center">
              <Wallet className="w-5 h-5 mr-2 text-neon-cyan" />
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {walletBalances.map((balance) => (
              <div key={balance.token} className="flex items-center justify-between p-3 rounded-lg glass">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{balance.icon}</span>
                  <div>
                    <p className="text-light-text font-medium">{balance.token}</p>
                    <p className="text-gray-400 text-sm">{balance.balance}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-light-text font-medium">{balance.value}</p>
                  <p className="text-neon-green text-sm">+2.4%</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="glass-dark border-0 animate-in">
          <CardHeader>
            <CardTitle className="text-light-text text-lg flex items-center">
              <IndianRupee className="w-5 h-5 mr-2 text-neon-green" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg glass hover-lift">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    {tx.status === "Complete" ? (
                      <CheckCircle className="w-5 h-5 text-neon-green" />
                    ) : (
                      <Circle className="w-5 h-5 text-neon-pink animate-pulse" />
                    )}
                  </div>
                  <div>
                    <p className="text-light-text font-medium text-sm sm:text-base">{tx.upiId}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-light-text font-medium text-sm sm:text-base">{tx.amount}</p>
                  <div className="flex items-center space-x-1">
                    <Badge variant="outline" className="text-xs border-border-light text-neon-cyan">
                      {tx.token}
                    </Badge>
                    <button className="text-gray-400 hover:text-neon-cyan">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* KYC Status */}
        <div className="text-center p-4 glass-dark rounded-xl">
          <Badge className="bg-gradient-success text-white">
            🛡️ KYC/AML Compliant
          </Badge>
          <p className="text-gray-400 text-xs mt-2">
            Secured and regulated for your safety
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
