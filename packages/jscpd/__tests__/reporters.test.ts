import {expect} from 'chai';
import {jscpd} from '../src';
import {green, grey} from 'colors/safe';
import sinon = require('sinon');
import path = require('path');


const pathToFixtures = path.join(__dirname, '/../../../fixtures');

describe('jscpd reporters', () => {

	let _log, _error;

	beforeEach(() => {
		_log = console.log;
		_error = console.error;
		console.log = sinon.spy();
		console.error = sinon.spy();
	})

	afterEach(() => {
		console.log = _log;
		console.error = _error;
	})

	describe('JSON', () => {

		it('should save json with report', async () => {
			const log = (console.log as any);
			await jscpd(['', '', pathToFixtures + '/clike/file2.c', '--reporters', 'json']);
			expect(log.calledWith(green('JSON report saved to report/jscpd-report.json'))).to.be.ok;
		});
	});

	describe('XML', () => {

		it('should save xml with report', async () => {
			const log = (console.log as any);
			await jscpd(['', '', pathToFixtures + '/clike/file2.c', '--reporters', 'xml']);
			expect(log.calledWith(green('XML report saved to report/jscpd-report.xml'))).to.be.ok;
		});
	});

	describe('HTML', () => {

		it('should save html with report', async () => {
			const log = (console.log as any);
			await jscpd(['', '', pathToFixtures + '/clike/file2.c', '--reporters', 'html']);
			expect(log.calledWith(green('HTML report saved to report/jscpd-report.html'))).to.be.ok;
		});
	});

	describe('Console Full', () => {
		it('should generate report with table', async () => {
			const log = (console.log as any);
			await jscpd(['', '', pathToFixtures + '/clike/file2.c', '--reporters', 'consoleFull']);
			expect(log.calledWith(grey('Found 1 clones.'))).to.be.ok;
		});
	});

	describe('Xcode', () => {
		it('should generate report with Xcode warnings', async () => {
			const log = (console.log as any);
			const pathToFile = path.join(pathToFixtures, '/clike/file2.c');
			const expected = pathToFile + ':18:3: warning: Found 10 lines (18-28) duplicated on file ' + pathToFile + ' (8-18)';
			await jscpd(['', '', pathToFile, '--reporters', 'xcode', '--absolute']);
			expect(log.calledWith(expected)).to.be.ok;
		});
	});

});
