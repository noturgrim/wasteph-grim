import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2, AlertCircle, FileText, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const ProposalResponse = () => {
  const { proposalId, action } = useParams(); // action: 'approve' or 'reject'
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [stage, setStage] = useState("loading"); // 'loading', 'confirmation', 'processing', 'success', 'error'
  const [message, setMessage] = useState("");
  const [proposalDetails, setProposalDetails] = useState(null);
  const [responseData, setResponseData] = useState(null);

  // Load proposal details for confirmation
  useEffect(() => {
    const loadProposalDetails = async () => {
      if (!token) {
        setStage("error");
        setMessage("Invalid or missing authentication token");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/proposals/public/${proposalId}/status?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setProposalDetails(data.data);
          setStage("confirmation");
        } else {
          setStage("error");
          setMessage(data.message || data.error || "Failed to load proposal details");
        }
      } catch (error) {
        console.error("Error loading proposal:", error);
        setStage("error");
        setMessage("An error occurred while loading the proposal. Please try again or contact us directly.");
      }
    };

    loadProposalDetails();
  }, [proposalId, token]);

  // Handle user confirmation
  const handleConfirm = async () => {
    setStage("processing");

    try {
      const endpoint = action === "approve" 
        ? `/proposals/public/${proposalId}/approve`
        : `/proposals/public/${proposalId}/reject`;

      const response = await fetch(`${API_URL}${endpoint}?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setStage("success");
        setMessage(data.message || "Your response has been recorded successfully");
        setResponseData(data.data);
      } else {
        setStage("error");
        setMessage(data.message || data.error || "Failed to record your response");
      }
    } catch (error) {
      console.error("Error recording response:", error);
      setStage("error");
      setMessage("An error occurred while processing your response. Please try again or contact us directly.");
    }
  };

  const handleCancel = () => {
    window.close(); // Close the tab
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md border-gray-200 shadow-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-[#0f4c2c]">
            {stage === "loading" && "Loading Proposal..."}
            {stage === "confirmation" && `${action === "approve" ? "Approve" : "Reject"} Proposal`}
            {stage === "processing" && "Processing Your Response..."}
            {stage === "success" && "Response Recorded"}
            {stage === "error" && "Unable to Process"}
          </CardTitle>
          {stage === "confirmation" && (
            <CardDescription className="text-[#374151]">
              Please confirm your decision for Proposal {proposalDetails.proposalNumber || proposalId}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent>
          {/* Loading State */}
          {stage === "loading" && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-16 w-16 animate-spin text-blue-600 mb-4" />
              <p className="text-gray-600">Loading proposal details...</p>
            </div>
          )}

          {/* Confirmation State */}
          {stage === "confirmation" && proposalDetails && (
            <div className="space-y-4">
              {/* Proposal Details - Matching Quotation Design */}
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg text-[#0f5132]">Proposal Details</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`${API_URL}/proposals/public/${proposalId}/pdf?token=${token}`, '_blank')}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200 cursor-pointer text-xs"
                  >
                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                    View PDF
                  </Button>
                </div>

                {/* Client Information */}
                <div>
                  <h4 className="text-sm font-bold text-[#1f2937]">
                    Client Information
                  </h4>
                  <p className="text-sm text-gray-700 font-medium">
                    Proposal Number: <span className="font-normal text-gray-600">{proposalDetails.proposalNumber || proposalId}</span>
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    Sent Date: <span className="font-normal text-gray-600">{proposalDetails.sentAt ? new Date(proposalDetails.sentAt).toLocaleDateString() : "N/A"}</span>
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    Expires: <span className="font-normal text-gray-600">{proposalDetails.expiresAt ? new Date(proposalDetails.expiresAt).toLocaleDateString() : "N/A"}</span>
                  </p>
                </div>

                {/* Proposal Status */}
                <div>
                  <h4 className="text-sm font-bold text-[#1f2937]">
                    Proposal Status
                  </h4>
                  <p className="text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      proposalDetails.clientResponse === "approved"
                        ? "bg-green-100 text-green-800"
                        : proposalDetails.clientResponse === "rejected"
                        ? "bg-red-100 text-red-800"
                        : proposalDetails.status === "sent"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {proposalDetails.clientResponse?.toUpperCase() || proposalDetails.status?.toUpperCase() || "PENDING"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Warning Banner - Matching Quotation Design */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      {action === "approve"
                        ? "You are about to approve this proposal"
                        : "You are about to decline this proposal"
                      }
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                      {action === "approve"
                        ? "By approving, you agree to the terms and conditions outlined in the proposal."
                        : "If you decline, the proposal will be canceled. You can contact us if you change your mind."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Processing State */}
          {stage === "processing" && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-16 w-16 animate-spin text-blue-600 mb-4" />
              <p className="text-gray-600">Processing your response...</p>
            </div>
          )}

          {/* Success State */}
          {stage === "success" && (
            <div className="flex flex-col items-center justify-center py-6">
              <div className={`rounded-full p-4 mb-4 ${
                action === "approve" 
                  ? "bg-green-100" 
                  : "bg-orange-100"
              }`}>
                {action === "approve" ? (
                  <CheckCircle className="h-16 w-16 text-green-600" />
                ) : (
                  <XCircle className="h-16 w-16 text-orange-600" />
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-center">
                {action === "approve" ? "Thank You!" : "Response Received"}
              </h3>
              
              <p className="text-gray-700 text-center mb-6">
                {message}
              </p>

              {action === "approve" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-5 w-full">
                  <h4 className="font-semibold text-green-900 mb-3">What happens next?</h4>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Our sales team has been notified of your approval</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>They will finalize the contract details and pricing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>You'll receive the final contract document via email</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>A team member will contact you shortly to discuss next steps</span>
                    </li>
                  </ul>
                </div>
              )}

              {action === "reject" && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 w-full">
                  <p className="text-sm text-orange-800">
                    We appreciate you taking the time to review our proposal. 
                    If you have any questions or would like to discuss alternative options, 
                    please don't hesitate to contact us.
                  </p>
                </div>
              )}

              {responseData && (
                <div className="border-t pt-4 mt-6 w-full">
                  <p className="text-xs text-gray-500 text-center">
                    Proposal: {responseData.proposalNumber || responseData.proposalId}
                    <br />
                    Recorded at: {new Date(responseData.respondedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Error State */}
          {stage === "error" && (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="rounded-full bg-red-100 p-4 mb-4">
                <AlertCircle className="h-16 w-16 text-red-600" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-center text-red-900">
                Something Went Wrong
              </h3>
              
              <p className="text-gray-700 text-center mb-6">
                {message}
              </p>

              <div className="bg-red-50 border border-red-200 rounded-lg p-5 w-full">
                <p className="text-sm text-red-800 mb-2 font-medium">
                  Possible reasons:
                </p>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• This link has already been used</li>
                  <li>• The link has expired</li>
                  <li>• The link is invalid</li>
                </ul>
              </div>
            </div>
          )}

          {/* Contact Information */}
          {(stage === "error" || stage === "success") && (
            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-center">
                Need Assistance?
              </h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p className="text-center">
                  <strong className="text-green-700">Email:</strong>{" "}
                  <span className="text-gray-700">info@wasteph.com</span>
                </p>
                <p className="text-center">
                  <strong className="text-green-700">Phone:</strong>{" "}
                  <span className="text-gray-700">+63 956 246 1503</span>
                </p>
              </div>
            </div>
          )}
        </CardContent>

        {/* Card Footer - Action Buttons for Confirmation */}
        {stage === "confirmation" && proposalDetails && (
          <CardFooter className="flex justify-between gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="text-gray-700 hover:bg-gray-100 border-gray-300 cursor-pointer transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className={
                action === "approve"
                  ? "bg-[#16a34a] hover:bg-[#15803d] active:bg-[#166534] text-white transition-colors cursor-pointer"
                  : "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white transition-colors cursor-pointer"
              }
            >
              {action === "approve" ? "Confirm Approval" : "Confirm Decline"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ProposalResponse;
