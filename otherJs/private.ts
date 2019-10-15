class A{
    private a:number;
    protected b:number;
    public c:number;
    constructor(){
        this.a = 3
        this.b = 2;
    }
    d(){
        this.a;
        this.b;
        this.c;
    }
}
class B extends A{
    constructor(){
        super();
    }
    d(){
        this.a;
        this.b;
        this.c;
    }
}
var a = new A()
var b = new B();
a.a;
a.b;
a.c;

b.a;
b.b;
b.c;

/**
 * 结论：
 * private 只可以在本类中访问；子类和外部不能访问；
 * protected  可以在本类和子类中访问，外部不能访问；
 * public 可以在 本类 和 子类 和外部访问；
 */
