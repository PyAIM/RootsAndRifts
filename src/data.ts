export type VisualKind = "polynomial" | "multiplicity" | "division" | "synthetic" | "bounds" | "complex" | "rational" | "slant" | "sign" | "build";

export type Question = {
  id: string;
  type: "mc" | "fill";
  prompt: string;
  options?: string[];
  correct?: number;
  answer?: string;
  accepted?: string[];
  explanation: string;
  visual?: VisualKind;
  hint?: string;
};

export type Mission = {
  id: string;
  order: number;
  title: string;
  short: string;
  subtitle: string;
  description: string;
  icon: string;
  accent: "lime" | "coral" | "cyan" | "violet" | "gold";
  art: string;
  badge: string;
  focus: string[];
  questions: Question[];
};

const q = (id: string, type: Question["type"], prompt: string, explanation: string, extras: Omit<Question, "id" | "type" | "prompt" | "explanation">): Question => ({ id, type, prompt, explanation, ...extras });
export const assetPath = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`;

export const MISSIONS: Mission[] = [
  {
    id: "polynomial-scout", order: 1, title: "Polynomial Scout", short: "Scout", subtitle: "Definition · degree · end behavior", icon: "⌁", accent: "lime", art: assetPath("polynomial-arch.png"), badge: "trail-scout",
    description: "Survey the terrain: identify true polynomials, read their degree, and predict their far-left and far-right behavior.",
    focus: ["Polynomial terms have nonnegative integer exponents.", "Degree n permits at most n − 1 turning points.", "Leading term controls end behavior."],
    questions: [
      q("p1", "mc", "Which expression is a polynomial?", "A polynomial has real coefficients and only nonnegative integer exponents on x. The other choices contain a variable denominator, radical, or negative exponent.", { options: ["3x⁴ − 2x + 1", "5/x + 2", "√x − 7", "x⁻² + 4"], correct: 0, visual: "polynomial" }),
      q("p2", "mc", "What is the degree of f(x) = −4x⁷ + 3x³ − 9?", "The degree is the largest exponent with a nonzero coefficient: 7.", { options: ["3", "7", "−4", "9"], correct: 1, visual: "polynomial" }),
      q("p3", "fill", "For a polynomial of degree 6, what is the maximum possible number of turning points?", "A degree-n polynomial can have at most n − 1 turns. Thus 6 − 1 = 5.", { answer: "5", accepted: ["five"], visual: "polynomial" }),
      q("p4", "mc", "Choose the end behavior of f(x) = −2x⁵ + x.", "Odd degree with a negative leading coefficient: left end rises and right end falls.", { options: ["falls left; rises right", "rises left; falls right", "rises on both ends", "falls on both ends"], correct: 1, visual: "polynomial" }),
      q("p5", "mc", "Choose the end behavior of g(x) = 5x⁴ − x² + 2.", "Even degree with a positive leading coefficient makes both ends rise.", { options: ["rises on both ends", "falls on both ends", "falls left; rises right", "rises left; falls right"], correct: 0, visual: "polynomial" }),
      q("p6", "fill", "Find the y-intercept of h(x) = 2x³ − 5x + 8. Enter only the y-value.", "The y-intercept occurs at x = 0. h(0) = 8.", { answer: "8", visual: "polynomial" }),
      q("p7", "mc", "A degree-5 polynomial can have at most how many real zeros?", "A polynomial of degree 5 has at most 5 real zeros; any remaining zeros may be nonreal.", { options: ["4", "5", "6", "10"], correct: 1, visual: "polynomial" }),
      q("p8", "mc", "Which leading-term pair guarantees a graph that falls on both ends?", "Both ends fall only for even degree with a negative leading coefficient.", { options: ["positive, odd degree", "negative, odd degree", "positive, even degree", "negative, even degree"], correct: 3, visual: "polynomial" }),
      q("p9", "mc", "Which statement is always true for a degree-4 polynomial?", "It can turn at most 3 times. It may turn fewer times and may have fewer than 4 real zeros.", { options: ["It has exactly 4 real zeros.", "It has at most 3 turning points.", "It crosses the x-axis four times.", "Both ends always fall."], correct: 1, visual: "polynomial" }),
      q("p10", "fill", "The leading coefficient of 7 − 3x + 11x⁶ is ___.", "Write the polynomial in descending order: 11x⁶ − 3x + 7. The leading coefficient is 11.", { answer: "11", visual: "polynomial" }),
    ],
  },
  {
    id: "root-beacons", order: 2, title: "Root Beacons", short: "Roots", subtitle: "Zeros · multiplicity · intercept behavior", icon: "◉", accent: "coral", art: assetPath("polynomial-arch.png"), badge: "root-reader",
    description: "Track where a polynomial meets the axis, decode multiplicity, and spot the telltale flattening of repeated roots.",
    focus: ["Zeros are x-values where f(x) = 0.", "Odd multiplicity crosses; even multiplicity touches and turns.", "Multiplicity 3 or higher often flattens near its x-intercept."],
    questions: [
      q("r1", "mc", "For f(x) = (x − 2)²(x + 1), which are the x-intercepts?", "Set each factor equal to zero: x = 2 and x = −1, giving (2, 0) and (−1, 0).", { options: ["(2, 0) only", "(−1, 0) only", "(2, 0) and (−1, 0)", "(0, 2) and (0, −1)"], correct: 2, visual: "multiplicity" }),
      q("r2", "mc", "At a zero with multiplicity 4, a polynomial graph usually…", "Even multiplicity means the sign does not change, so the graph touches the axis and turns around.", { options: ["crosses straight through", "touches and turns", "has a vertical asymptote", "must be undefined"], correct: 1, visual: "multiplicity" }),
      q("r3", "mc", "At x = −3, f(x) has multiplicity 3. What behavior is expected?", "Multiplicity 3 is odd, so the graph crosses the axis; because the multiplicity exceeds 1, it commonly flattens as it crosses.", { options: ["touches and turns sharply", "crosses, often flattening", "has a hole", "cannot be graphed"], correct: 1, visual: "multiplicity" }),
      q("r4", "fill", "Find the y-intercept value of f(x) = −(x − 1)(x + 2)².", "Evaluate at x = 0: f(0) = −(−1)(2²) = 4.", { answer: "4", visual: "multiplicity" }),
      q("r5", "mc", "Which factor creates a zero at x = 5 with even multiplicity?", "A factor (x − 5)² gives x = 5 and has even multiplicity 2.", { options: ["x + 5", "(x + 5)²", "(x − 5)²", "(5x − 1)"], correct: 2, visual: "multiplicity" }),
      q("r6", "mc", "A graph crosses the x-axis at x = 1 and touches/turns at x = −2. Which factored form could match?", "The crossing needs odd multiplicity at 1; touching needs even multiplicity at −2.", { options: ["(x − 1)²(x + 2)", "(x − 1)(x + 2)²", "(x − 1)²(x + 2)²", "(x − 1)(x + 2)"], correct: 1, visual: "multiplicity" }),
      q("r7", "fill", "For f(x) = (x + 4)³(x − 1), enter the multiplicity of the zero x = −4.", "The exponent on the factor (x + 4) is 3, so x = −4 has multiplicity 3.", { answer: "3", visual: "multiplicity" }),
      q("r8", "mc", "What is the best pre-calculus sketching habit after finding zeros and end behavior?", "Use intercepts, a few easy test points, and likely crossing behavior. Exact extrema generally require calculus, so an honest qualitative sketch is the goal.", { options: ["Place every maximum exactly", "Use intercepts, test points, and behavior", "Ignore the y-intercept", "Draw only straight lines"], correct: 1, visual: "multiplicity" }),
      q("r9", "mc", "If x = 0 is a zero of f(x), what point is automatically on the graph?", "A zero is an x-intercept. When x = 0, the point is (0, 0), which is also the y-intercept.", { options: ["(0, 1)", "(1, 0)", "(0, 0)", "(1, 1)"], correct: 2, visual: "multiplicity" }),
      q("r10", "mc", "A root of multiplicity 1 is called…", "Multiplicity 1 means the factor appears once; the graph normally crosses without the repeated-root flattening.", { options: ["a simple zero", "a vertical asymptote", "a conjugate", "a lower bound"], correct: 0, visual: "multiplicity" }),
    ],
  },
  {
    id: "sketch-station", order: 3, title: "Sketch Station", short: "Sketch", subtitle: "Points · end behavior · qualitative graphs", icon: "⌇", accent: "cyan", art: assetPath("polynomial-arch.png"), badge: "curve-cartographer",
    description: "Build trustworthy polynomial sketches from structure: intercepts, multiplicities, end behavior, and a handful of well-chosen points.",
    focus: ["Use a sign/behavior story before drawing.", "The y-intercept and easy inputs anchor a sketch.", "A pre-calculus sketch is qualitative, not calculus-perfect."],
    questions: [
      q("s1", "mc", "For f(x) = (x + 2)(x − 1)², which point is the y-intercept?", "f(0) = (2)(−1)² = 2, so the y-intercept is (0, 2).", { options: ["(2, 0)", "(0, 2)", "(−2, 0)", "(0, −2)"], correct: 1, visual: "polynomial" }),
      q("s2", "mc", "For f(x) = (x + 2)(x − 1)², which zero is a touch-and-turn zero?", "x = 1 comes from the squared factor, so it has even multiplicity and touches/turns.", { options: ["x = −2", "x = 1", "both", "neither"], correct: 1, visual: "multiplicity" }),
      q("s3", "fill", "Evaluate p(2) for p(x) = (x − 3)(x + 1).", "p(2) = (−1)(3) = −3. This gives the extra graph point (2, −3).", { answer: "-3", accepted: ["−3"], visual: "polynomial" }),
      q("s4", "mc", "A degree-3 polynomial has positive leading coefficient. Its end behavior is…", "Positive odd degree falls left and rises right.", { options: ["rises left; falls right", "falls left; rises right", "rises on both ends", "falls on both ends"], correct: 1, visual: "polynomial" }),
      q("s5", "mc", "Why should a Precalculus sketch avoid claiming an exact peak location when no calculus was used?", "Intercepts and sample points establish the shape, but derivatives are the usual tool for locating extrema precisely.", { options: ["Peaks do not exist", "Exact extrema usually require calculus", "Polynomials cannot turn", "Only rational functions have peaks"], correct: 1, visual: "polynomial" }),
      q("s6", "mc", "For f(x) = −(x − 2)³, what happens as x approaches 2?", "The graph crosses at x = 2 because multiplicity 3 is odd, and it flattens near that intercept. The negative outside flips the overall vertical orientation.", { options: ["touches and turns", "crosses with flattening", "has a vertical asymptote", "is undefined"], correct: 1, visual: "multiplicity" }),
      q("s7", "fill", "For g(x) = x³ − 4x, enter g(−2).", "g(−2) = −8 + 8 = 0, confirming x = −2 is an x-intercept.", { answer: "0", visual: "polynomial" }),
      q("s8", "mc", "Which is NOT an appropriate anchor for a qualitative polynomial sketch?", "Intercepts, end behavior, multiplicities, and easy test points are all useful. A random claim of an exact critical point is not.", { options: ["y-intercept", "zero multiplicity", "end behavior", "an invented exact maximum"], correct: 3, visual: "polynomial" }),
      q("s9", "mc", "If a polynomial has factors (x + 1)²(x − 3) and positive leading coefficient, what is its degree?", "The degree is 2 + 1 = 3.", { options: ["2", "3", "4", "5"], correct: 1, visual: "polynomial" }),
      q("s10", "fill", "For f(x) = (x − 1)(x + 1), enter f(0).", "f(0) = (−1)(1) = −1, so the y-intercept is (0, −1).", { answer: "-1", accepted: ["−1"], visual: "polynomial" }),
    ],
  },
  {
    id: "division-forge", order: 4, title: "Division Forge", short: "Long Division", subtitle: "Polynomial long division", icon: "÷", accent: "coral", art: assetPath("division-forge.png"), badge: "long-division-smith",
    description: "Forge quotients the classic way: divide leading terms, multiply back, subtract, and repeat with every missing-power placeholder in place.",
    focus: ["Arrange terms in descending powers.", "Use 0xᵏ placeholders for missing powers.", "Dividend = divisor · quotient + remainder."],
    questions: [
      q("d1", "mc", "Divide x² + 5x + 6 by x + 2. What is the quotient?", "x²/(x) = x; subtract x² + 2x to get 3x + 6. Then +3 completes the quotient x + 3 with remainder 0.", { options: ["x + 3", "x − 3", "x + 2", "x² + 3"], correct: 0, visual: "division" }),
      q("d2", "mc", "Before dividing x³ − 4x + 1 by x − 2, which rewritten dividend is best?", "The x² term is missing, so use x³ + 0x² − 4x + 1.", { options: ["x³ − 4x + 1", "x³ + 0x² − 4x + 1", "x³ + 4x + 1", "0x³ − 4x + 1"], correct: 1, visual: "division" }),
      q("d3", "fill", "Divide x² − 1 by x − 1. Enter the quotient.", "x² − 1 = (x − 1)(x + 1), so the quotient is x + 1.", { answer: "x+1", accepted: ["x + 1"], visual: "division" }),
      q("d4", "mc", "When dividing 2x³ + 3x² − x + 5 by x + 1, the first quotient term is…", "Divide the leading terms: 2x³ ÷ x = 2x².", { options: ["2x²", "2x", "3x²", "−2x²"], correct: 0, visual: "division" }),
      q("d5", "mc", "If f(x) divided by x − 4 gives quotient q(x) and remainder 7, which identity is true?", "The Division Algorithm says f(x) = (x − 4)q(x) + 7.", { options: ["f(x) = q(x) + 7", "f(x) = (x − 4)q(x) + 7", "f(x) = 7q(x)", "f(x) = (x + 4)q(x) − 7"], correct: 1, visual: "division" }),
      q("d6", "fill", "Divide x³ − 8 by x − 2. Enter the quotient.", "x³ − 8 = (x − 2)(x² + 2x + 4), a difference of cubes.", { answer: "x^2+2x+4", accepted: ["x²+2x+4", "x² + 2x + 4", "x^2 + 2x + 4"], visual: "division" }),
      q("d7", "mc", "Why do we multiply the divisor by each new quotient term during long division?", "We multiply back so that subtracting removes the current leading term of the dividend/remainder.", { options: ["To create a remainder immediately", "To cancel the current leading term", "To change the divisor", "To find complex zeros"], correct: 1, visual: "division" }),
      q("d8", "mc", "Divide x² + x − 2 by x − 1. What is the remainder?", "Synthetic or long division gives quotient x + 2 with remainder 0 because x = 1 is a zero.", { options: ["−2", "−1", "0", "2"], correct: 2, visual: "division" }),
      q("d9", "fill", "For (x² + 1) ÷ (x − 1), enter the remainder.", "Evaluating at x = 1 gives 1² + 1 = 2, so the remainder is 2.", { answer: "2", visual: "division" }),
      q("d10", "mc", "After a long-division subtraction, what comes next?", "Bring down the next term (including a zero-coefficient placeholder if necessary), then repeat the divide–multiply–subtract cycle.", { options: ["Stop immediately", "Bring down the next term", "Square the divisor", "Change every sign in the quotient"], correct: 1, visual: "division" }),
    ],
  },
  {
    id: "synthetic-bay", order: 5, title: "Synthetic Bay", short: "Synthetic", subtitle: "Synthetic division", icon: "⇢", accent: "gold", art: assetPath("division-forge.png"), badge: "synthetic-navigator",
    description: "Run fast division on linear factors x − c. Drop, multiply, add—then read the quotient and remainder from the final row.",
    focus: ["For x − c, use c in the synthetic box.", "Include zero coefficients for missing powers.", "The final value is the remainder."],
    questions: [
      q("y1", "mc", "To synthetically divide by x − 3, which number goes in the synthetic box?", "The divisor is x − c, so c = 3.", { options: ["−3", "0", "3", "1/3"], correct: 2, visual: "synthetic" }),
      q("y2", "mc", "To synthetically divide by x + 4, which number goes in the box?", "Write x + 4 as x − (−4), so use −4.", { options: ["4", "−4", "0", "1/4"], correct: 1, visual: "synthetic" }),
      q("y3", "fill", "Use synthetic division to find the remainder when x² − 5x + 6 is divided by x − 2.", "Use 2: bring down 1, multiply 2, add to get −3, multiply −6, add 0. The remainder is 0.", { answer: "0", visual: "synthetic" }),
      q("y4", "mc", "Which coefficient list matches x⁴ − 3x² + 2x − 7 for synthetic division?", "The x³ term is missing, so the coefficients are 1, 0, −3, 2, −7.", { options: ["1, −3, 2, −7", "1, 0, −3, 2, −7", "4, −3, 2, −7", "1, 0, 3, 2, −7"], correct: 1, visual: "synthetic" }),
      q("y5", "mc", "When 1 is used with coefficients 1, −3, 2, what is the final synthetic value?", "Bring down 1; multiply 1 and add to get −2; multiply −2 and add to get 0. The final value is 0.", { options: ["−1", "0", "1", "2"], correct: 1, visual: "synthetic" }),
      q("y6", "fill", "Divide x² + 3x + 2 by x + 1 using synthetic division. Enter the quotient.", "Use −1: the bottom row is 1, 2, 0, so the quotient is x + 2.", { answer: "x+2", accepted: ["x + 2"], visual: "synthetic" }),
      q("y7", "mc", "The bottom synthetic row for dividing a cubic by x − c is 2, −1, 5, 7. What is the remainder?", "All but the final entry are quotient coefficients; the final entry is the remainder, 7.", { options: ["2", "−1", "5", "7"], correct: 3, visual: "synthetic" }),
      q("y8", "mc", "Synthetic division is most directly designed for divisors of the form…", "Synthetic division is the shortcut for linear monic divisors x − c.", { options: ["x² + 1", "x − c", "2x² − 3", "x³ − 8"], correct: 1, visual: "synthetic" }),
      q("y9", "fill", "Find the remainder when x³ + 2x² − 5 is divided by x + 1.", "Use c = −1. Equivalently evaluate f(−1): −1 + 2 − 5 = −4.", { answer: "-4", accepted: ["−4"], visual: "synthetic" }),
      q("y10", "mc", "If a synthetic row ends in 0, what can you conclude about x − c?", "The remainder is zero, so x − c is a factor and c is a zero.", { options: ["It is never a factor", "It is a factor", "The polynomial has no zeros", "The degree is zero"], correct: 1, visual: "synthetic" }),
    ],
  },
  {
    id: "remainder-relay", order: 6, title: "Remainder Relay", short: "Remainders", subtitle: "Remainder Theorem · Factor Theorem", icon: "⊹", accent: "cyan", art: assetPath("division-forge.png"), badge: "remainder-runner",
    description: "Turn division into evaluation: the remainder from x − c is f(c). A zero remainder is your factorization signal.",
    focus: ["Remainder upon division by x − c is f(c).", "x − c is a factor exactly when f(c) = 0.", "Remainder and Factor Theorems connect values, zeros, and factors."],
    questions: [
      q("t1", "fill", "By the Remainder Theorem, find the remainder when f(x) = x³ − 2x + 5 is divided by x − 2.", "Evaluate f(2) = 8 − 4 + 5 = 9. That is the remainder.", { answer: "9", visual: "synthetic" }),
      q("t2", "mc", "If f(−3) = 0, which statement must be true?", "By the Factor Theorem, f(−3) = 0 exactly when x + 3 is a factor.", { options: ["x − 3 is a factor", "x + 3 is a factor", "x² + 9 is a factor", "f has no zeros"], correct: 1, visual: "synthetic" }),
      q("t3", "mc", "What is the remainder when p(x) = 2x² + x − 1 is divided by x + 1?", "Use c = −1: p(−1) = 2(1) − 1 − 1 = 0.", { options: ["−4", "−2", "0", "2"], correct: 2, visual: "synthetic" }),
      q("t4", "mc", "Which linear factor corresponds to the zero c = 5?", "A zero c corresponds to the factor x − c, so c = 5 gives x − 5.", { options: ["x + 5", "x − 5", "5x − 1", "x² − 25"], correct: 1, visual: "synthetic" }),
      q("t5", "fill", "If f(4) = −7, enter the remainder when f(x) is divided by x − 4.", "The Remainder Theorem directly says the remainder is f(4), which is −7.", { answer: "-7", accepted: ["−7"], visual: "synthetic" }),
      q("t6", "mc", "Which evaluation tests whether x − 6 is a factor of f(x)?", "Use c = 6 and check whether f(6) = 0.", { options: ["f(−6)", "f(0)", "f(6)", "f(x − 6)"], correct: 2, visual: "synthetic" }),
      q("t7", "mc", "For f(x) = x² − 9, which factor is verified by the Factor Theorem?", "f(3) = 9 − 9 = 0, so x − 3 is a factor. In fact x² − 9 = (x − 3)(x + 3).", { options: ["x − 3", "x − 9", "x + 9", "x² + 9"], correct: 0, visual: "synthetic" }),
      q("t8", "fill", "Find f(−2) for f(x) = x³ + 4x² − x − 6.", "f(−2) = −8 + 16 + 2 − 6 = 4.", { answer: "4", visual: "synthetic" }),
      q("t9", "mc", "If the remainder when dividing by x − 1 is 5, what is f(1)?", "The Remainder Theorem gives f(1) = 5.", { options: ["−5", "0", "1", "5"], correct: 3, visual: "synthetic" }),
      q("t10", "mc", "What does a nonzero remainder tell you about x − c?", "If the remainder is nonzero, then f(c) ≠ 0, so x − c is not a factor.", { options: ["It is definitely a factor", "It is not a factor", "c is a double zero", "The polynomial is undefined"], correct: 1, visual: "synthetic" }),
    ],
  },
  {
    id: "root-hunter", order: 7, title: "Root Hunter", short: "Rational Zeros", subtitle: "Rational Zero Theorem · real zeros", icon: "⌖", accent: "lime", art: assetPath("polynomial-arch.png"), badge: "rational-root-hunter",
    description: "Track rational-zero candidates, test strategically with synthetic division, and keep factoring until every real zero is exposed.",
    focus: ["Candidates are ± factors of constant / factors of leading coefficient.", "Test candidates efficiently with synthetic division.", "A confirmed zero reduces the polynomial degree."],
    questions: [
      q("h1", "mc", "For f(x) = 2x³ − 3x² − 8x + 12, which number is a possible rational zero?", "Possible rational zeros are ± factors of 12 over factors of 2, including ±1, ±2, ±3, ±4, ±6, ±12, ±1/2, ±3/2. Thus 3/2 is possible.", { options: ["5/2", "3/2", "7", "1/3"], correct: 1, visual: "synthetic" }),
      q("h2", "mc", "For x³ − 6x² + 11x − 6, which value is a zero?", "Test 1: 1 − 6 + 11 − 6 = 0. The polynomial factors as (x − 1)(x − 2)(x − 3).", { options: ["−1", "1", "4", "6"], correct: 1, visual: "synthetic" }),
      q("h3", "fill", "List one possible rational zero of 3x² − 5x − 2. Enter a number.", "Candidates include ±1, ±2, ±1/3, ±2/3. Any listed candidate is acceptable; 2 is one.", { answer: "2", accepted: ["-2", "1", "-1", "1/3", "-1/3", "2/3", "-2/3"], visual: "synthetic" }),
      q("h4", "mc", "Why is synthetic division helpful after the Rational Zero Theorem?", "The theorem makes a finite candidate list; synthetic division tests candidates quickly and gives a lower-degree quotient after a hit.", { options: ["It makes all candidates irrational", "It quickly tests candidates and reduces degree", "It replaces graphing", "It only works for quadratics"], correct: 1, visual: "synthetic" }),
      q("h5", "mc", "For f(x) = x³ + x² − 4x − 4, which factorization follows after grouping?", "Group: x²(x + 1) − 4(x + 1) = (x + 1)(x² − 4) = (x + 1)(x − 2)(x + 2).", { options: ["(x + 1)(x − 2)(x + 2)", "(x − 1)(x² + 4)", "(x + 4)(x² − 1)", "(x − 2)³"], correct: 0, visual: "polynomial" }),
      q("h6", "fill", "For f(x) = x³ − 4x² − x + 4, enter one real zero.", "Factoring by grouping gives (x − 4)(x² − 1) = (x − 4)(x − 1)(x + 1). Any of −1, 1, or 4 works.", { answer: "4", accepted: ["1", "-1", "−1"], visual: "polynomial" }),
      q("h7", "mc", "For 4x² + 7x − 2, which is NOT a possible rational-zero candidate?", "Factors of −2 over factors of 4 give ±1, ±2, ±1/2, ±1/4. The value 3/4 is not on the list.", { options: ["1/2", "−1/4", "2", "3/4"], correct: 3, visual: "synthetic" }),
      q("h8", "mc", "Once x = −2 is verified as a zero, which factor is removed by division?", "A zero c corresponds to x − c. For c = −2, the factor is x + 2.", { options: ["x − 2", "x + 2", "x² + 4", "x + 1/2"], correct: 1, visual: "synthetic" }),
      q("h9", "mc", "A polynomial has rational coefficients and degree 3. After finding one rational zero, the quotient is degree…", "Dividing by a linear factor lowers the degree by one, from 3 to 2.", { options: ["0", "1", "2", "3"], correct: 2, visual: "synthetic" }),
      q("h10", "mc", "The Rational Zero Theorem lists…", "It lists possible rational zeros, not guaranteed zeros. Each candidate still needs a test.", { options: ["all guaranteed zeros", "possible rational zeros", "only complex zeros", "all turning points"], correct: 1, visual: "synthetic" }),
    ],
  },
  {
    id: "bound-watch", order: 8, title: "Bound Watch", short: "Bounds", subtitle: "Upper / lower bound theorem", icon: "↟", accent: "gold", art: assetPath("polynomial-arch.png"), badge: "bound-keeper",
    description: "Use synthetic-division sign patterns to fence in positive and negative real zeros before the root hunt gets expensive.",
    focus: ["For c > 0: all nonnegative bottom-row entries certify an upper bound.", "For c < 0: alternating signs (zeros allowed) certify a lower bound.", "Bounds narrow the graphing and zero-search window."],
    questions: [
      q("b1", "mc", "When c > 0 is used in synthetic division and every bottom-row entry is nonnegative, c is…", "This is the Upper Bound Theorem: c is an upper bound for the real zeros.", { options: ["a lower bound", "an upper bound", "a complex zero", "a vertical asymptote"], correct: 1, visual: "bounds" }),
      q("b2", "mc", "When c < 0 is used and the bottom row alternates signs (zeros allowed), c is…", "This is the Lower Bound Theorem: c is a lower bound for the real zeros.", { options: ["an upper bound", "a lower bound", "always a zero", "a remainder"], correct: 1, visual: "bounds" }),
      q("b3", "mc", "A synthetic bottom row using c = 4 is 1, 5, 9, 18. What can be concluded?", "Because c is positive and every result is nonnegative, 4 is an upper bound for real zeros.", { options: ["4 is a lower bound", "4 is an upper bound", "4 must be a zero", "there are no real zeros"], correct: 1, visual: "bounds" }),
      q("b4", "mc", "Using c = −3 yields bottom-row signs +, −, +, −. What can be concluded?", "For negative c, alternating signs certify c as a lower bound for real zeros.", { options: ["−3 is an upper bound", "−3 is a lower bound", "−3 is a double root", "No conclusion is possible"], correct: 1, visual: "bounds" }),
      q("b5", "mc", "What is the main purpose of upper/lower bounds in a root search?", "They give a sensible interval containing all real zeros, making graphing and testing more strategic.", { options: ["To prove every candidate is rational", "To narrow where real zeros can lie", "To replace factoring", "To locate exact extrema"], correct: 1, visual: "bounds" }),
      q("b6", "fill", "A positive test value c has a completely nonnegative synthetic bottom row. Enter whether it is an 'upper' or 'lower' bound.", "The Upper Bound Theorem applies to a positive c with all nonnegative entries.", { answer: "upper", accepted: ["upper bound"], visual: "bounds" }),
      q("b7", "mc", "Can a zero in a synthetic bottom row still fit the Upper Bound Theorem?", "Yes. Nonnegative means positive or zero.", { options: ["No, every value must be positive", "Yes, zero is allowed", "Only if c is negative", "Only for quadratics"], correct: 1, visual: "bounds" }),
      q("b8", "mc", "Which statement is FALSE?", "Bounds restrict real zeros, but they do not say a bound value itself is a zero.", { options: ["Upper/lower bounds help bracket real zeros.", "A bound value must be a zero.", "An upper bound can be positive.", "A lower bound can be negative."], correct: 1, visual: "bounds" }),
      q("b9", "mc", "If −5 is a lower bound and 4 is an upper bound, every real zero lies…", "All real zeros must be in the interval [−5, 4].", { options: ["outside [−5, 4]", "in [−5, 4]", "only at −5", "only at 4"], correct: 1, visual: "bounds" }),
      q("b10", "fill", "If c = −2 produces an alternating-sign bottom row, enter the type of bound certified.", "A negative c with alternating signs certifies a lower bound.", { answer: "lower", accepted: ["lower bound"], visual: "bounds" }),
    ],
  },
  {
    id: "complex-vault", order: 9, title: "Complex Vault", short: "Complex Zeros", subtitle: "FTA · conjugate pairs · linear factors", icon: "✦", accent: "violet", art: assetPath("complex-vault.png"), badge: "conjugate-keeper",
    description: "Unlock every zero—real and imaginary. Use the Fundamental Theorem of Algebra and conjugate pairs to complete factorizations over the complex numbers.",
    focus: ["Degree n guarantees n complex zeros, counting multiplicity.", "With real coefficients, nonreal zeros arrive in conjugate pairs.", "All zeros unlock factorization into linear factors over ℂ."],
    questions: [
      q("c1", "mc", "By the Fundamental Theorem of Algebra, a degree-7 polynomial has how many complex zeros, counting multiplicity?", "It has exactly 7 complex zeros when multiplicity is counted.", { options: ["at most 6", "exactly 7", "exactly 14", "only real zeros"], correct: 1, visual: "complex" }),
      q("c2", "mc", "A polynomial with real coefficients has zero 3 + 2i. What else must be a zero?", "Nonreal zeros of real-coefficient polynomials come in conjugate pairs: 3 − 2i.", { options: ["−3 + 2i", "3 − 2i", "−3 − 2i", "2 + 3i"], correct: 1, visual: "complex" }),
      q("c3", "mc", "Which factor pair corresponds to zeros 2i and −2i?", "The factors are (x − 2i)(x + 2i) = x² + 4.", { options: ["(x − 2)(x + 2)", "(x − 2i)(x + 2i)", "(x + 2i)²", "x² − 4"], correct: 1, visual: "complex" }),
      q("c4", "fill", "If x = −4 is a zero, enter its linear factor.", "A zero c gives factor x − c. For c = −4, x − (−4) = x + 4.", { answer: "x+4", accepted: ["x + 4"], visual: "complex" }),
      q("c5", "mc", "Factor x² + 9 over the complex numbers.", "x² + 9 = x² − (3i)² = (x − 3i)(x + 3i).", { options: ["(x − 3)(x + 3)", "(x − 3i)(x + 3i)", "(x + 9)(x − 1)", "It cannot be factored"], correct: 1, visual: "complex" }),
      q("c6", "mc", "A degree-5 polynomial has known zeros 1, −2, i, and −i. How many zeros are still unlisted, counting multiplicity?", "Four zeros are listed; degree 5 means one more zero is needed.", { options: ["0", "1", "2", "5"], correct: 1, visual: "complex" }),
      q("c7", "mc", "Why does knowing every zero lead to full factorization over ℂ?", "Each zero c supplies a linear factor x − c. Multiplying all factors (with a leading constant if needed) builds the polynomial.", { options: ["Zeros remove the need for coefficients", "Every zero gives a linear factor", "Complex zeros are ignored", "Only quadratics factor"], correct: 1, visual: "complex" }),
      q("c8", "fill", "If 5 − 7i is a zero of a real-coefficient polynomial, enter the required conjugate zero.", "Change only the sign of the imaginary part: 5 + 7i.", { answer: "5+7i", accepted: ["5 + 7i"], visual: "complex" }),
      q("c9", "mc", "Which polynomial has zeros 1 and −1 and no other zeros?", "The factors are (x − 1)(x + 1) = x² − 1.", { options: ["x² + 1", "x² − 1", "x − 1", "x² + 2x + 1"], correct: 1, visual: "complex" }),
      q("c10", "mc", "What does 'counting multiplicity' mean?", "A repeated zero is included as many times as its factor exponent indicates.", { options: ["Ignore repeated zeros", "Count a repeated zero once only", "Count each repeated occurrence", "Count only imaginary zeros"], correct: 2, visual: "complex" }),
    ],
  },
  {
    id: "polynomial-lab", order: 10, title: "Polynomial Lab", short: "Build", subtitle: "Reverse-engineer polynomials", icon: "⚗", accent: "gold", art: assetPath("complex-vault.png"), badge: "factor-architect",
    description: "Work backward from zeros, multiplicities, degree, and intercept conditions to engineer complete polynomials and factorizations.",
    focus: ["Zero c contributes factor x − c.", "Multiplicity becomes a factor exponent.", "Use a leading constant to satisfy a requested y-intercept or leading coefficient."],
    questions: [
      q("l1", "mc", "Which monic polynomial has zeros 2 and −3?", "Monic means leading coefficient 1. Use (x − 2)(x + 3) = x² + x − 6.", { options: ["x² + x − 6", "x² − x − 6", "x² + 5x + 6", "x² − 6"], correct: 0, visual: "build" }),
      q("l2", "mc", "Build a polynomial with zeros −1 (mult. 2) and 4. Which factored form works?", "Use (x + 1)² for the repeated zero −1 and (x − 4) for zero 4.", { options: ["(x − 1)²(x + 4)", "(x + 1)²(x − 4)", "(x + 1)(x − 4)²", "(x + 1)² + (x − 4)"], correct: 1, visual: "build" }),
      q("l3", "fill", "A monic polynomial has only zero x = 3 with multiplicity 2. Enter it in factored form.", "The repeated zero contributes (x − 3)².", { answer: "(x-3)^2", accepted: ["(x − 3)²", "(x-3)²", "(x − 3)^2"], visual: "build" }),
      q("l4", "mc", "Which polynomial has zeros 1, 1, and −2?", "Use (x − 1)²(x + 2).", { options: ["(x − 1)(x + 2)²", "(x − 1)²(x + 2)", "(x + 1)²(x − 2)", "x³ − 2"], correct: 1, visual: "build" }),
      q("l5", "mc", "A polynomial has zeros 1 and −1 and y-intercept 6. Which function works?", "Start with a(x² − 1). At x = 0, y = −a. Set −a = 6, so a = −6 and f(x) = −6(x² − 1).", { options: ["6(x² − 1)", "−6(x² − 1)", "6(x² + 1)", "−6(x − 1)(x − 1)"], correct: 1, visual: "build" }),
      q("l6", "fill", "For f(x) = 2(x − 1)(x + 3), enter f(0).", "f(0) = 2(−1)(3) = −6.", { answer: "-6", accepted: ["−6"], visual: "build" }),
      q("l7", "mc", "A monic cubic has zeros 0, 2, and −2. Which is it?", "Use x(x − 2)(x + 2) = x(x² − 4) = x³ − 4x.", { options: ["x³ − 4x", "x³ + 4x", "x² − 4", "x³ − 8"], correct: 0, visual: "build" }),
      q("l8", "mc", "Which condition determines a missing leading constant a in f(x) = a(x − 2)(x + 1)?", "A specified y-intercept or any specified point gives an equation in a.", { options: ["The color of the graph", "A y-intercept or known point", "The Rational Zero Theorem alone", "A vertical asymptote"], correct: 1, visual: "build" }),
      q("l9", "fill", "A polynomial has zeros 2i and −2i. Enter the real quadratic factor they create.", "(x − 2i)(x + 2i) = x² + 4.", { answer: "x^2+4", accepted: ["x²+4", "x² + 4", "x^2 + 4"], visual: "build" }),
      q("l10", "mc", "If a zero is 4 with multiplicity 3, which factor must appear?", "Multiplicity 3 means the factor appears as (x − 4)³.", { options: ["x − 4", "(x − 4)²", "(x − 4)³", "(x + 4)³"], correct: 2, visual: "build" }),
    ],
  },
  {
    id: "rational-outpost", order: 11, title: "Rational Outpost", short: "Rational", subtitle: "Intercepts · holes · asymptotes", icon: "⟂", accent: "coral", art: assetPath("rational-rift.png"), badge: "rift-surveyor",
    description: "Map rational terrain: restrictions, holes, intercepts, and every horizontal, vertical, or slant asymptote before you sketch.",
    focus: ["Vertical asymptotes occur at uncanceled denominator zeros.", "Canceling a common factor creates a hole, not an asymptote.", "Compare degrees for horizontal/slant asymptotes; divide for a slant line."],
    questions: [
      q("a1", "mc", "For f(x) = (x + 1)/(x − 3), where is the vertical asymptote?", "The denominator is zero at x = 3 and no factor cancels, so x = 3 is a vertical asymptote.", { options: ["x = −1", "x = 0", "x = 1", "x = 3"], correct: 3, visual: "rational" }),
      q("a2", "mc", "For f(x) = (2x² + 1)/(x² − 4), what is the horizontal asymptote?", "The degrees are equal, so use the ratio of leading coefficients: y = 2/1 = 2.", { options: ["y = 0", "y = 1", "y = 2", "no horizontal asymptote"], correct: 2, visual: "rational" }),
      q("a3", "mc", "For f(x) = (x + 2)/(x² − 1), what are the x-intercepts?", "Set the numerator equal to zero: x + 2 = 0 gives x = −2, provided the denominator is not zero there.", { options: ["x = −1 and x = 1", "x = −2", "x = 0", "none"], correct: 1, visual: "rational" }),
      q("a4", "mc", "For f(x) = (x² − 1)/(x − 1), what feature occurs at x = 1?", "Factor: (x − 1)(x + 1)/(x − 1) = x + 1, but x = 1 remains excluded. That is a hole at (1, 2).", { options: ["vertical asymptote", "hole", "x-intercept", "horizontal asymptote"], correct: 1, visual: "rational" }),
      q("a5", "fill", "Find the y-intercept value of f(x) = (x − 4)/(x + 2).", "Evaluate f(0) = −4/2 = −2.", { answer: "-2", accepted: ["−2"], visual: "rational" }),
      q("a6", "mc", "For f(x) = (x² + 1)/(x − 1), which asymptote type should be found by division?", "The numerator degree is exactly one higher than the denominator degree, so there is a slant (oblique) asymptote found by division.", { options: ["vertical only", "horizontal", "slant", "none"], correct: 2, visual: "slant" }),
      q("a7", "mc", "For f(x) = 3/(x² + 1), what is the horizontal asymptote?", "The numerator degree is smaller than the denominator degree, so y = 0.", { options: ["x = 0", "y = 0", "y = 1", "none"], correct: 1, visual: "rational" }),
      q("a8", "mc", "What must be checked before declaring a denominator zero a vertical asymptote?", "First see whether the factor cancels with the numerator. Cancellation creates a hole instead.", { options: ["Whether the numerator equals 1", "Whether the factor cancels", "Whether the graph has turns", "Whether x is positive"], correct: 1, visual: "rational" }),
      q("a9", "mc", "For f(x) = (x − 2)/(x + 4), can the graph cross its horizontal asymptote y = 1?", "Solve (x − 2)/(x + 4) = 1. This would require x − 2 = x + 4, impossible, so it never meets y = 1.", { options: ["Yes, at x = 0", "Yes, at x = −4", "No, it never intersects y = 1", "Only at infinity"], correct: 2, visual: "rational" }),
      q("a10", "fill", "For f(x) = 1/(x − 5), enter the vertical asymptote x-value.", "The denominator is zero at x = 5, so the vertical asymptote is x = 5.", { answer: "5", visual: "rational" }),
    ],
  },
  {
    id: "rift-chart", order: 12, title: "Rift Chart", short: "Sign & Sketch", subtitle: "Sign charts · intersections · complete sketches", icon: "↯", accent: "cyan", art: assetPath("rational-rift.png"), badge: "rift-cartographer",
    description: "Complete the rational-function expedition with sign charts, asymptote intersections, and logically layered sketches.",
    focus: ["Split a sign chart at zeros and undefined points.", "Test one point per interval.", "A complete sketch combines asymptotes, intercepts, signs, and extra points."],
    questions: [
      q("g1", "mc", "For f(x) = (x − 1)/(x + 2), which x-values split a sign chart?", "Split at the numerator zero x = 1 and denominator zero x = −2.", { options: ["x = 0 only", "x = 1 only", "x = −2 only", "x = −2 and x = 1"], correct: 3, visual: "sign" }),
      q("g2", "mc", "For f(x) = (x − 1)/(x + 2), what is the sign on (1, ∞)?", "Choose x = 2: (2 − 1)/(2 + 2) = 1/4, which is positive.", { options: ["positive", "negative", "zero everywhere", "undefined everywhere"], correct: 0, visual: "sign" }),
      q("g3", "mc", "For f(x) = (x − 1)/(x + 2), what is the sign on (−2, 1)?", "Choose x = 0: (−1)/(2) is negative.", { options: ["positive", "negative", "zero", "undefined"], correct: 1, visual: "sign" }),
      q("g4", "mc", "The slant asymptote of (x² + 1)/(x − 1) is…", "Long division: x² + 1 = (x − 1)(x + 1) + 2, so the slant asymptote is y = x + 1.", { options: ["y = x − 1", "y = x + 1", "y = 1", "x = 1"], correct: 1, visual: "slant" }),
      q("g5", "mc", "Can f(x) = (x² − 1)/(x² + 1) intersect its horizontal asymptote y = 1?", "Set the function equal to 1: x² − 1 = x² + 1, impossible. So it does not cross y = 1.", { options: ["Yes, at x = 0", "Yes, at x = 1", "No", "Only at x = −1"], correct: 2, visual: "rational" }),
      q("g6", "fill", "For f(x) = (x − 3)/(x + 1), enter f(0).", "f(0) = −3/1 = −3. This is a useful graphing point.", { answer: "-3", accepted: ["−3"], visual: "rational" }),
      q("g7", "mc", "Which order is most reliable for sketching a rational function?", "First restrictions/holes and asymptotes, then intercepts, then a sign chart and test points, then connect branches while respecting the asymptotes.", { options: ["Draw a curve first, then guess", "Asymptotes/restrictions → intercepts → signs/points → branches", "Only use the y-intercept", "Find exact extrema with no derivatives"], correct: 1, visual: "sign" }),
      q("g8", "mc", "For f(x) = (x + 1)/(x − 2), what happens as x approaches 2 from the right?", "The numerator is positive near 2 and the denominator is a tiny positive number, so f(x) rises toward +∞.", { options: ["f(x) → −∞", "f(x) → +∞", "f(x) → 0", "f(x) → 1"], correct: 1, visual: "rational" }),
      q("g9", "mc", "A rational graph may cross a horizontal or slant asymptote when…", "There is no general ban on crossing. Solve f(x) = asymptote equation to check; some functions cross, others do not.", { options: ["never", "always at x = 0", "the corresponding equation has a valid solution", "only when there is a vertical asymptote"], correct: 2, visual: "slant" }),
      q("g10", "fill", "For f(x) = (x + 2)/(x − 1), enter the x-intercept x-value.", "Set the numerator equal to zero: x + 2 = 0 gives x = −2, and the denominator is nonzero there.", { answer: "-2", accepted: ["−2"], visual: "rational" }),
    ],
  },
];

export const OPTIONAL_ORACLE: Question[] = [
  q("o1", "mc", "Optional Pattern Oracle: How many positive real zeros are possible for f(x) = x³ − 4x² + x + 6, according to Descartes' Rule of Signs?", "The signs are +, −, +, +, which makes 2 sign changes. The number of positive real zeros can be 2 or 0 (decreasing by an even integer).", { options: ["exactly 1", "exactly 2", "2 or 0", "3 or 1"], correct: 2, visual: "polynomial" }),
  q("o2", "mc", "Optional Pattern Oracle: In x⁴ + 2x² + 1, how many sign changes are there?", "Ignoring missing terms, all nonzero coefficients are positive, so there are 0 sign changes and therefore 0 positive real zeros by Descartes' Rule.", { options: ["0", "1", "2", "4"], correct: 0, visual: "polynomial" }),
  q("o3", "mc", "Why is Descartes' Rule only a possibility rule?", "It tells possible counts based on sign changes; it does not identify the actual zeros or prove which possibility occurs.", { options: ["It finds every exact zero", "It gives possible counts, not exact roots", "It only works for rationals", "It replaces synthetic division"], correct: 1, visual: "polynomial" }),
];

export const BOSS = {
  id: "summit-boss", title: "The Great Rifts", badge: "rifts-legend", threshold: 16,
  description: "A 20-question mixed expedition across every tool in the chapter. Earn 80% or better to claim the Roots & Rifts Legend badge.",
};

export const TEACH_TOPICS = [
  { id: "polynomial", icon: "⌁", name: "Polynomial Maps", intro: "A polynomial is a finite sum of terms aₙxⁿ with nonnegative integer exponents. Its leading term predicts how the graph behaves far from the origin.", formula: "degree = largest exponent\nmax turns = degree − 1\nleading term aₙxⁿ controls end behavior", example: "For −2x⁵ + x: odd degree + negative leading coefficient, so the graph rises left and falls right.", watch: "Degree gives a maximum number of turns or real zeros, not a guarantee." },
  { id: "zeros", icon: "◉", name: "Zeros & Multiplicity", intro: "Zeros make f(x) = 0 and become x-intercepts. Factor exponents tell the multiplicity and the graph's local behavior at the intercept.", formula: "zero c ↔ factor (x − c)^m\neven m: touch/turn\nodd m: cross\nm ≥ 3: flattening is common", example: "(x − 2)³(x + 1) has zeros 2 (mult. 3, crosses/flattens) and −1 (simple crossing).", watch: "A zero is an x-value; an x-intercept is the ordered pair (c, 0)." },
  { id: "division", icon: "÷", name: "Division Tools", intro: "Long division works for any polynomial divisor. Synthetic division is a faster routine when the divisor is x − c.", formula: "dividend = divisor · quotient + remainder\nsynthetic box: c for x − c", example: "x³ − 8 ÷ (x − 2) = x² + 2x + 4 with remainder 0.", watch: "Always insert zero coefficients for missing powers before synthetic division." },
  { id: "theorems", icon: "⊹", name: "Remainders & Factors", intro: "The Remainder Theorem evaluates a polynomial through division. The Factor Theorem is the special zero-remainder case.", formula: "remainder from x − c = f(c)\nf(c) = 0 ↔ x − c is a factor", example: "For f(x)=x²−9, f(3)=0, so x−3 is a factor.", watch: "A nonzero remainder means x − c is not a factor." },
  { id: "rationalzeros", icon: "⌖", name: "Root Hunting", intro: "The Rational Zero Theorem narrows a potentially enormous search to a finite candidate list. Test candidates, divide after a hit, then factor the reduced polynomial.", formula: "possible rational zeros = ± p/q\np: factors of constant\nq: factors of leading coefficient", example: "For 2x³−3x²−8x+12, candidates include ±1, ±2, ±3/2, ±3, ±4, ±6, ±12.", watch: "Candidates are possibilities, not promises." },
  { id: "complex", icon: "✦", name: "Complex Vault", intro: "The Fundamental Theorem of Algebra guarantees a degree-n polynomial has n complex zeros counting multiplicity. Real coefficients force nonreal zeros to occur in conjugate pairs.", formula: "a + bi zero → a − bi zero (real coefficients)\nzero c → factor x − c", example: "Zeros 2i and −2i create (x−2i)(x+2i)=x²+4.", watch: "Complex zeros are not missing information—they finish the factorization." },
  { id: "rational", icon: "⟂", name: "Rational Terrain", intro: "A rational function is a quotient of polynomials. Its graph is shaped by excluded inputs, intercepts, sign, and asymptotes.", formula: "denominator zero, uncanceled → vertical asymptote\ncommon factor cancels → hole\ndeg N < deg D: y=0\ndeg N = deg D: ratio of leading coefficients", example: "(2x²+1)/(x²−4) has horizontal asymptote y=2 and vertical asymptotes x=±2.", watch: "Cancel first: a canceled denominator zero is a hole, not a vertical asymptote." },
  { id: "sketch", icon: "↯", name: "Sketch Protocol", intro: "For rational functions, graph strategically: restrictions and asymptotes first, then intercepts, then signs and a few test points. For polynomials, use the analogous structure story.", formula: "sign chart splits at zeros and undefined points\nslant asymptote: quotient from division", example: "(x²+1)/(x−1)=x+1+2/(x−1), so the slant asymptote is y=x+1.", watch: "An asymptote can be crossed. Solve the intersection equation rather than guessing." },
];

export function selectRun(pool: Question[], count: number, seed?: number): Question[] {
  const items = [...pool];
  let state = (seed ?? Math.floor(Math.random() * 2 ** 31)) >>> 0;
  const random = () => { state = (state * 1664525 + 1013904223) >>> 0; return state / 2 ** 32; };
  for (let i = items.length - 1; i > 0; i -= 1) { const j = Math.floor(random() * (i + 1)); [items[i], items[j]] = [items[j], items[i]]; }
  return items.slice(0, Math.min(count, items.length));
}

export function allBossQuestions(): Question[] {
  return MISSIONS.flatMap((mission) => mission.questions.slice(0, 2));
}
