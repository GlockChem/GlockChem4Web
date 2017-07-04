// GlockChem JS Library
/*------ BEGIN: AdvNum ------*/
/**
 * AdvNum - 带误差计算的数值类型
 * 注意：
 *   四则运算不能与普通数值型混用。
 *   若要混用，请用new AdvNum(num)来代替原数值！
 * @author DuckSoft
 * @version 0.1
 * @param {any} num 
 * @param {any} uncertain 相对于初始化数值的离散程度，可不填
 */
function AdvNum(num, uncertain) {
	this.set = function (value) {
		this.numInner = this.numMin = this.numMax = value;
		return this;
	}

    this.add = function (operand) {
		this.numInner += operand.numInner;
		this.numMin += operand.numMin;
		this.numMax += operand.numMax;
		return this;
	}

	this.subtract = function (operand) {
		this.numInner -= operand.numInner;
		this.numMin -= operand.numMin;
		this.numMax -= operand.numMax;
		return this;
	}

	this.multiply = function (operand) {
		this.numInner *= operand.numInner;
		this.numMin *= operand.numMin;
		this.numMax *= operand.numMax;
		return this;
	}

	this.divide = function (operand) {
		this.numInner /= operand.numInner;
		this.numMin /= operand.numMax;
		this.numMax /= operand.numMix;
		return this;
	}

    this.getCenterizedNum = function () {
        return (this.numMin + this.numMax) / 2;
    }

    this.centerize = function () {
        this.numInner = this.getCenterizedNum();
    }

    this.getErrorWidth = function () {
        return this.numMax - this.numMin;
    }

	if (num == undefined) {
		this.set(0.0);
	} else {
		this.set(num);
		if (uncertain != undefined) {
			this.numMin -= uncertain;
			this.numMax += uncertain;
		}
	}
}
/*------  END : AdvNum ------*/

/*------ BEGIN: RMDatabase ------*/
function RMDatabase() {
    this.RMData = new Map();
    dataRMName = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Th", "Pa", "U"];
    dataRMError = [ 0.00007,0.000002,0.002,0.0000003,0.007,0.0008,0.0002,0.0003,0.000000006,0.0006,0.00000002,0.0006,0.0000007,0.0003,0.000000005,0.005,0.002,0.001,0.0001,0.004,0.000005,0.001,0.0001,0.0006,0.000003,0.002,0.000004,0.0004,0.003,0.02,0.001,0.01,0.000006,0.008,0.001,0.002,0.0003,0.01,0.00002,0.002,0.00002,0.01,0.0004,0.02,0.00002,0.01,0.0002,0.004,0.003,0.007,0.001,0.03,0.00003,0.006,0.00000006,0.007,0.00007,0.001,0.00002,0.003,0.2,0.02,0.001,0.03,0.00002,0.001,0.00002,0.003,0.00002,0.005,0.0001,0.02,0.00002,0.01,0.001,0.03,0.003,0.009,0.000005,0.02,0.0002,0.1,0.00001,0.0004,0.00002,0.00003];
    dataRMValue = [ 1.00794,4.002602,6.941,9.0121831,10.811,12.0107,14.0067,15.9994,18.998403163,20.1797,22.98976928,24.3050,26.9815385,28.0855,30.973761998,32.065,35.453,39.948,39.0983,40.078,44.955908,47.867,50.9415,51.9961,54.938044,55.845,58.933194,58.6934,63.546,65.38,69.723,72.64,74.921595,78.971,79.904,83.798,85.4678,87.62,88.90584,91.224,92.90637,95.95,98.9072,101.07,102.90550,106.42,107.8682,112.414,114.818,118.710,121.760,127.60,126.90447,131.293,132.90545196,137.327,138.90547,140.116,140.90766,144.242,144.9,150.36,151.964,157.25,158.92535,162.500,164.93033,167.259,168.93422,173.054,174.9668,178.49,180.94788,183.84,186.207,190.23,192.217,195.084,196.966569,200.59,204.3833,207.2,208.98040,232.0377,231.03588,238.02891];

    for (var i = 0; i < dataRMName.length; i++) {
        this.RMData.set(dataRMName[i], new AdvNum(dataRMValue[i], dataRMError[i]));
    }

    this.queryAtom = function (inAtom) {
        if (this.RMData.has(inAtom)) {
            return this.RMData.get(inAtom);
        } else {
            return null;
        }
    }
}
/*------  END : RMDatabase ------*/

// TODO: Formula
// TODO: Equation
// TODO: EquationBalance
// TODO: EquationCalc
