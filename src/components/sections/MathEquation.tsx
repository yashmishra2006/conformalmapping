import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface MathEquationProps {
  equation: string;
  isBlock?: boolean;
  className?: string;
}

const MathEquation: React.FC<MathEquationProps> = ({
  equation,
  isBlock = false,
  className = '',
}) => {
  return isBlock ? (
    <div className={`math-formula ${className}`}>
      <BlockMath math={equation} />
    </div>
  ) : (
    <span className={className}>
      <InlineMath math={equation} />
    </span>
  );
};

export default MathEquation;
