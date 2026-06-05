import "./service-architecture-stack.css";

export interface ArchitectureStackLayer {
  title: string;
  subtitle: string;
}

export interface ServiceArchitectureStackProps {
  topLayer?: ArchitectureStackLayer;
  bottomLayer?: ArchitectureStackLayer;
  className?: string;
}

const DEFAULT_TOP: ArchitectureStackLayer = {
  title: "Your Team",
  subtitle: "Defines priorities, direction, and goals.",
};

const DEFAULT_BOTTOM: ArchitectureStackLayer = {
  title: "Production",
  subtitle:
    "Runtime systems, infrastructure, code execution, and everything around them.",
};

function CornerMarks() {
  return (
    <>
      <span className="service-architecture-corner service-architecture-corner--tl" />
      <span className="service-architecture-corner service-architecture-corner--tr" />
      <span className="service-architecture-corner service-architecture-corner--bl" />
      <span className="service-architecture-corner service-architecture-corner--br" />
    </>
  );
}

function StackLayer({ title, subtitle }: ArchitectureStackLayer) {
  return (
    <div className="service-architecture-stack__layer">
      <CornerMarks />
      <h3 className="service-architecture-stack__title">{title}</h3>
      <p className="service-architecture-stack__subtitle">{subtitle}</p>
    </div>
  );
}

/** Step 1 — right-side bookend stack (Your Team + Production). */
export default function ServiceArchitectureStack({
  topLayer = DEFAULT_TOP,
  bottomLayer = DEFAULT_BOTTOM,
  className = "",
}: ServiceArchitectureStackProps) {
  return (
    <div
      className={`service-architecture-stack ${className}`.trim()}
      aria-label="Service architecture stack"
    >
      <StackLayer {...topLayer} />
      <div className="service-architecture-stack__slot" aria-hidden="true" />
      <StackLayer {...bottomLayer} />
    </div>
  );
}
