import Cycle from '@cycle/core';
import calc from './calc-mvi';
import {bmi} from './calc-config';
calc(bmi).run();
