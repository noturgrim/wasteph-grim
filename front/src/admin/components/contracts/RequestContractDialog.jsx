import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Loader2 } from "lucide-react";

export function RequestContractDialog({ open, onOpenChange, contract, onConfirm }) {
  const [requestNotes, setRequestNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm(requestNotes);
      setRequestNotes(""); // Reset after success
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (isOpen) => {
    if (!isOpen && !isSubmitting) {
      setRequestNotes(""); // Reset on close
    }
    onOpenChange(isOpen);
  };

  if (!contract) return null;

  const clientName = contract.inquiry?.name || "N/A";
  const clientEmail = contract.inquiry?.email || "N/A";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Request Contract
          </DialogTitle>
          <DialogDescription>
            Request admin to create a contract for this approved proposal.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Proposal Summary */}
          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
            <div>
              <p className="text-sm text-muted-foreground">Client</p>
              <p className="font-semibold">{clientName}</p>
              <p className="text-sm text-muted-foreground">{clientEmail}</p>
            </div>
          </div>

          {/* Request Notes (Optional) */}
          <div>
            <Label htmlFor="requestNotes">
              Request Notes <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Textarea
              id="requestNotes"
              value={requestNotes}
              onChange={(e) => setRequestNotes(e.target.value)}
              placeholder="Add any notes or special requirements for admin..."
              rows={3}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              These notes will help admin understand any special requirements for the contract.
            </p>
          </div>

          {/* Info */}
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3">
            <p className="text-sm text-green-900 dark:text-green-100">
              <strong>Note:</strong> Admin will be notified and will prepare the contract document for you.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleClose(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Requesting..." : "Request Contract"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
