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
import { Input } from "@/components/ui/input";
import { Upload, Loader2, AlertCircle, FileCheck } from "lucide-react";

export function UploadContractDialog({ open, onOpenChange, contract, users, onConfirm }) {
  const [pdfFile, setPdfFile] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (file) {
      // Validate file type
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        setPdfFile(null);
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        setPdfFile(null);
        return;
      }

      setPdfFile(file);
    }
  };

  const handleSubmit = async (sendToSales) => {
    if (!pdfFile) {
      setError("Please select a PDF file");
      return;
    }

    setIsSubmitting(true);
    try {
      await onConfirm(pdfFile, adminNotes, sendToSales);
      // Reset on success
      setPdfFile(null);
      setAdminNotes("");
      setError("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (isOpen) => {
    if (!isOpen && !isSubmitting) {
      setPdfFile(null);
      setAdminNotes("");
      setError("");
    }
    onOpenChange(isOpen);
  };

  if (!contract) return null;

  const clientName = contract.inquiry?.name || "N/A";
  const salesPerson = users.find((u) => u.id === contract.proposal?.requestedBy);
  const salesPersonName = salesPerson
    ? `${salesPerson.firstName} ${salesPerson.lastName}`
    : "Unknown";
  const requestNotes = contract.contract?.requestNotes;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />
            Upload Contract
          </DialogTitle>
          <DialogDescription>
            Upload the contract PDF document for this client.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Contract Request Details */}
          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Client</p>
              <p className="font-semibold">{clientName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sales Person</p>
              <p className="font-medium">{salesPersonName}</p>
            </div>
            {requestNotes && (
              <div>
                <p className="text-sm text-muted-foreground">Request Notes</p>
                <p className="text-sm">{requestNotes}</p>
              </div>
            )}
          </div>

          {/* File Upload */}
          <div>
            <Label htmlFor="contractPdf">Contract PDF *</Label>
            <Input
              id="contractPdf"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Upload a PDF file (max 10MB)
            </p>
            {pdfFile && (
              <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                <FileCheck className="h-4 w-4" />
                {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
            {error && (
              <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>

          {/* Admin Notes (Optional) */}
          <div>
            <Label htmlFor="adminNotes">
              Notes for Sales <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Textarea
              id="adminNotes"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add any notes or instructions for sales..."
              rows={3}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              These notes will be visible to the sales person.
            </p>
          </div>

          {/* Info */}
          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
            <p className="text-sm text-yellow-900 dark:text-yellow-100">
              <strong>Note:</strong> You can save the contract as a draft or save and immediately send it to sales.
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
            variant="secondary"
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting || !pdfFile}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Draft
          </Button>
          <Button
            onClick={() => handleSubmit(true)}
            disabled={isSubmitting || !pdfFile}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Uploading..." : "Save & Send to Sales"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
