import { FileText, Download, Eye } from "lucide-react";

function DocRow({ label, fileName, onView }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-line px-3.5 py-2.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-bg text-primary">
          <FileText className="w-4 h-4" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-sm font-body text-heading leading-tight">{label}</p>
          <p className="text-xs text-slate-400 font-body">{fileName || "Not uploaded"}</p>
        </div>
      </div>
      {fileName && (
        <div className="flex items-center gap-1">
          <button onClick={onView} className="rounded-lg p-1.5 text-slate-500 hover:bg-surface-alt transition-colors">
            <Eye className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <button className="rounded-lg p-1.5 text-slate-500 hover:bg-surface-alt transition-colors">
            <Download className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function DocumentsSection({ documents, onViewDocument }) {
  return (
    <div className="space-y-2.5">
      <DocRow label="Resume" fileName={documents.resume} onView={() => onViewDocument("Resume", documents.resume)} />
      <DocRow
        label="Certificates"
        fileName={documents.certificates.length ? documents.certificates.join(", ") : null}
        onView={() => onViewDocument("Certificates", documents.certificates.join(", "))}
      />
      <DocRow label="Cover Letter" fileName={documents.coverLetter} onView={() => onViewDocument("Cover Letter", documents.coverLetter)} />
      <DocRow label="ID Proof" fileName={documents.idProof} onView={() => onViewDocument("ID Proof", documents.idProof)} />
      {documents.portfolio && (
        <div className="flex items-center justify-between rounded-xl border border-line px-3.5 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-bg text-primary">
              <FileText className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <p className="text-sm font-body text-heading">Portfolio</p>
          </div>
          <a href={documents.portfolio} target="_blank" rel="noreferrer" className="text-sm font-body text-primary hover:underline">
            Visit
          </a>
        </div>
      )}
    </div>
  );
}