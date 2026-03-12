"use client";

interface TemplateCardProps {
  title: string;
  description: string;
  type: "PDF" | "Template" | "Schéma";
  downloadUrl?: string;
  className?: string;
}

// Download icon
function DownloadIcon({ className = "", size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

// Type-specific icons
function PDFIcon({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10 12h4" />
      <path d="M10 16h4" />
    </svg>
  );
}

function TemplateIcon({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

function SchemaIcon({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const typeConfig = {
  PDF: {
    icon: PDFIcon,
    colorClass: "text-red-400",
    bgClass: "bg-red-500/10",
    borderClass: "border-red-500/20",
  },
  Template: {
    icon: TemplateIcon,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-500/10",
    borderClass: "border-blue-500/20",
  },
  Schéma: {
    icon: SchemaIcon,
    colorClass: "text-purple-400",
    bgClass: "bg-purple-500/10",
    borderClass: "border-purple-500/20",
  },
};

export function TemplateCard({
  title,
  description,
  type,
  downloadUrl = "#",
  className = "",
}: TemplateCardProps) {
  const config = typeConfig[type];
  const IconComponent = config.icon;

  const handleDownload = () => {
    // In production, this would trigger actual download
    console.log(`Downloading: ${title}`);
  };

  return (
    <div className={`template-card rounded-2xl p-6 space-y-4 ${className}`}>
      {/* Icon & Badge */}
      <div className="flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-xl ${config.bgClass} flex items-center justify-center`}
        >
          <IconComponent size={24} className={config.colorClass} />
        </div>
        <span
          className={`template-badge px-2.5 py-1 rounded-full text-xs font-medium ${config.bgClass} ${config.colorClass} border ${config.borderClass}`}
        >
          {type}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h4 className="template-title text-lg font-semibold text-white transition-colors duration-300">
          {title}
        </h4>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="template-download-btn w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-350"
      >
        <DownloadIcon size={16} />
        <span>Télécharger</span>
      </button>
    </div>
  );
}
