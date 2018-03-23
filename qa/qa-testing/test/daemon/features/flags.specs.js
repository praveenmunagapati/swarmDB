import cmd from 'node-cmd';
import waitUntil from 'async-wait-until';
import {logFileExists, logFileMoved} from '../utils.js';
import {PATH_TO_DAEMON} from './00-setup';
