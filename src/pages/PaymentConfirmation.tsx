
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Share, CheckCircle, Clock, Home } from "lucide-react";
import { toast } from "sonner";

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [progress, setProgress] = useState(0);

  const paymentData = location.state || {
    upiId: "demo@paytm",
    amount: "100",
    selectedToken: "USDT",
    inrAmount: "8,320",
    totalFee: "1.7"
  };

  const txHash = "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z";

  useEffect(() => {
    // Simulate transaction processing
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setStatus('success');
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleShare = (platform: string) => {
    const message = `Payment sent successfully! 💸\n${paymentData.amount} ${paymentData.selectedToken} → ₹${paymentData.inrAmount}\nTo: ${paymentData.upiId}\nTx: ${txHash.substring(0, 20)}...`;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?text=${encodeURIComponent(message)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-base via-glass-surface to-dark-base p-4 sm:p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Status Card */}
        <Card className="glass-dark border-0 animate-in text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              {status === 'pending' && (
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center animate-pulse">
                  <Clock className="w-10 h-10 text-white" />
                </div>
              )}
              {status === 'success' && (
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-success flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              )}
            </div>

            <h1 className="text-2xl font-bold text-light-text mb-2">
              {status === 'pending' && 'Processing Payment...'}
              {status === 'success' && 'Payment Successful! 🎉'}
              {status === 'failed' && 'Payment Failed'}
            </h1>

            <p className="text-gray-400 mb-4">
              {status === 'pending' && 'Your crypto is being converted and sent'}
              {status === 'success' && 'Money has been sent to the recipient'}
              {status === 'failed' && 'Something went wrong with your transaction'}
            </p>

            {status === 'pending' && (
              <div className="w-full bg-border-light rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-neon h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            <Badge 
              className={`${
                status === 'pending' ? 'bg-neon-pink' : 
                status === 'success' ? 'bg-neon-green' : 'bg-neon-red'
              } text-white px-4 py-2`}
            >
              {status === 'pending' && 'Processing'}
              {status === 'success' && 'Completed'}
              {status === 'failed' && 'Failed'}
            </Badge>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card className="glass-dark border-0 animate-in">
          <CardHeader>
            <CardTitle className="text-light-text text-lg">Transaction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">To</span>
              <div className="text-right">
                <p className="text-light-text font-medium">{paymentData.upiId}</p>
                <button 
                  onClick={() => copyToClipboard(paymentData.upiId, 'UPI ID')}
                  className="text-neon-cyan text-sm hover:underline"
                >
                  Copy UPI ID
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Amount Sent</span>
              <div className="text-right">
                <p className="text-light-text font-medium">
                  {paymentData.amount} {paymentData.selectedToken}
                </p>
                <p className="text-neon-green text-sm">≈ ₹{paymentData.inrAmount}</p>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Network Fee</span>
              <span className="text-light-text">{paymentData.totalFee} {paymentData.selectedToken}</span>
            </div>

            <div className="border-t border-border-light pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Transaction Hash</span>
                <div className="flex items-center space-x-2">
                  <span className="text-light-text text-sm font-mono">
                    {txHash.substring(0, 12)}...
                  </span>
                  <button 
                    onClick={() => copyToClipboard(txHash, 'Transaction hash')}
                    className="text-neon-cyan hover:text-neon-pink"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        {status === 'success' && (
          <Card className="glass-dark border-0 animate-in">
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="glass border-border-light text-light-text hover:bg-border-light"
                  onClick={() => {/* Download receipt logic */}}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Receipt
                </Button>
                <Button
                  variant="outline"
                  className="glass border-border-light text-light-text hover:bg-border-light"
                  onClick={() => handleShare('whatsapp')}
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => handleShare('whatsapp')}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  📱 WhatsApp
                </Button>
                <Button
                  onClick={() => handleShare('telegram')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  ✈️ Telegram
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Back to Home */}
        <Button
          onClick={() => navigate('/')}
          className="w-full bg-gradient-neon hover:opacity-90 text-white font-medium py-3 rounded-xl transition-all duration-300"
          size="lg"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Button>

        {/* Success Message */}
        {status === 'success' && (
          <div className="text-center p-6 glass-dark rounded-xl animate-in">
            <p className="text-neon-green font-medium mb-2">
              "Send USDT, Get INR. Instantly." ✨
            </p>
            <p className="text-gray-400 text-sm">
              The fastest way to move money across chains into banks.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;
