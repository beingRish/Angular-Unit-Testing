import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service"
import { LoggerService } from "../Logger/logger.service";

describe('CalculatorService', () => {
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;
  let calculator: CalculatorService

  beforeEach(() => {
    console.log("calling before each");
    const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: mockLoggerService
        }
      ]
    })
    calculator = TestBed.inject(CalculatorService);
    loggerServiceSpy = TestBed.inject(
      LoggerService
    ) as jasmine.SpyObj<LoggerService>
  })

  it('should add two numbers', () => {
    console.log("calling add");
    let result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  })

  it('should subtract two numbers', () => {
    console.log("calling sub");
    let result = calculator.subtract(2, 2);
    expect(result).toBe(0);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  })
})