+++
title = "Java数组知识总结整理串讲"
date = "2025-12-04T21:20:12.770000+08:00"
lang = "zh-cn"
draft = false
slug = "java02"
categories = []
tags = [ "JAVA", "编程",]
featured = false
summary = ""
+++

# Java数组知识总结整理串讲

## 一、数组概述

### 1.1 什么是数组

数组（Array）是Java中用来存储**相同类型数据**的**有序集合**。数组是一个**引用类型**，在内存中连续存储。

**数组的特点：**
- 数组长度固定，一旦创建不能改变
- 数组元素类型必须相同
- 数组通过索引（下标）访问元素，索引从0开始
- 数组是对象，存储在堆内存中

### 1.2 数组的声明方式

Java中声明数组有三种方式：

```java
// 方式1：数据类型[] 数组名;
int[] arr1;

// 方式2：数据类型 数组名[];
int arr2[];

// 方式3：直接初始化
int[] arr3 = {1, 2, 3, 4, 5};
```

**推荐使用方式1**，因为更符合Java的编程规范。

---

## 二、一维数组

### 2.1 一维数组的创建

#### 方式1：声明后分配空间
```java
int[] arr;
arr = new int[5];  // 创建长度为5的int数组，默认值为0
```

#### 方式2：声明时分配空间
```java
int[] arr = new int[5];
```

#### 方式3：声明时初始化
```java
int[] arr = {1, 2, 3, 4, 5};
// 或
int[] arr = new int[]{1, 2, 3, 4, 5};
```

**示例代码：**
```java
public class OneDimensionArray {
    public static void main(String[] args) {
        // 方式1：先声明后分配
        int[] arr1;
        arr1 = new int[3];
        arr1[0] = 10;
        arr1[1] = 20;
        arr1[2] = 30;
        
        // 方式2：声明时分配
        int[] arr2 = new int[3];
        arr2[0] = 100;
        arr2[1] = 200;
        arr2[2] = 300;
        
        // 方式3：声明时初始化
        int[] arr3 = {1, 2, 3, 4, 5};
        int[] arr4 = new int[]{6, 7, 8, 9, 10};
        
        // 访问数组元素
        System.out.println("arr3[0] = " + arr3[0]);  // 输出：1
        System.out.println("arr3[4] = " + arr3[4]);  // 输出：5
        
        // 获取数组长度
        System.out.println("arr3的长度: " + arr3.length);  // 输出：5
    }
}
```

### 2.2 数组的默认值

不同类型的数组在创建后，元素会有默认值：

| 数据类型 | 默认值 |
|---------|--------|
| byte, short, int, long | 0 |
| float, double | 0.0 |
| char | '\u0000'（空字符） |
| boolean | false |
| 引用类型 | null |

**示例代码：**
```java
public class ArrayDefaultValue {
    public static void main(String[] args) {
        int[] intArr = new int[3];
        double[] doubleArr = new double[3];
        char[] charArr = new char[3];
        boolean[] boolArr = new boolean[3];
        String[] strArr = new String[3];
        
        System.out.println("int数组默认值: " + intArr[0]);        // 0
        System.out.println("double数组默认值: " + doubleArr[0]);  // 0.0
        System.out.println("char数组默认值: " + (int)charArr[0]); // 0
        System.out.println("boolean数组默认值: " + boolArr[0]);   // false
        System.out.println("String数组默认值: " + strArr[0]);      // null
    }
}
```

### 2.3 数组的遍历

#### 方式1：for循环（传统方式）
```java
int[] arr = {1, 2, 3, 4, 5};
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}
```

#### 方式2：增强for循环（for-each）

```java
int[] arr = {1, 2, 3, 4, 5};
for (int element : arr) {
    System.out.println(element);
}
```

#### 方式3：使用Arrays.toString()
```java
import java.util.Arrays;

int[] arr = {1, 2, 3, 4, 5};
System.out.println(Arrays.toString(arr));  // 输出：[1, 2, 3, 4, 5]
```

**示例代码：**
```java
import java.util.Arrays;

public class ArrayTraversal {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        
        // 方式1：传统for循环
        System.out.println("方式1：传统for循环");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
        
        // 方式2：增强for循环
        System.out.println("方式2：增强for循环");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
        
        // 方式3：Arrays.toString()
        System.out.println("方式3：Arrays.toString()");
        System.out.println(Arrays.toString(arr));
    }
}
```

### 2.4 数组的常用操作

#### 查找元素
```java
public class ArraySearch {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        int target = 30;
        int index = -1;
        
        // 线性查找
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                index = i;
                break;
            }
        }
        
        if (index != -1) {
            System.out.println("找到元素 " + target + "，索引为: " + index);
        } else {
            System.out.println("未找到元素 " + target);
        }
    }
}
```

#### 求最大值和最小值
```java
public class ArrayMaxMin {
    public static void main(String[] args) {
        int[] arr = {34, 12, 56, 78, 23, 45};
        
        int max = arr[0];
        int min = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
            if (arr[i] < min) {
                min = arr[i];
            }
        }
        
        System.out.println("最大值: " + max);  // 78
        System.out.println("最小值: " + min);  // 12
    }
}
```

#### 数组求和与平均值
```java
public class ArraySum {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        
        int sum = 0;
        for (int num : arr) {
            sum += num;
        }
        
        double average = (double) sum / arr.length;
        
        System.out.println("数组元素和: " + sum);        // 150
        System.out.println("数组平均值: " + average);    // 30.0
    }
}
```

#### 数组反转
```java
public class ArrayReverse {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        
        System.out.println("原数组: " + Arrays.toString(arr));
        
        // 反转数组
        for (int i = 0; i < arr.length / 2; i++) {
            int temp = arr[i];
            arr[i] = arr[arr.length - 1 - i];
            arr[arr.length - 1 - i] = temp;
        }
        
        System.out.println("反转后: " + Arrays.toString(arr));
        // 输出：[5, 4, 3, 2, 1]
    }
}
```

---

## 三、多维数组

### 3.1 二维数组

二维数组可以理解为"数组的数组"，即每个元素又是一个数组。

#### 二维数组的创建

**方式1：声明后分配空间**
```java
int[][] arr;
arr = new int[3][4];  // 3行4列
```

**方式2：声明时分配空间**
```java
int[][] arr = new int[3][4];
```

**方式3：声明时初始化**
```java
int[][] arr = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
```

**示例代码：**
```java
public class TwoDimensionArray {
    public static void main(String[] args) {
        // 方式1：规则二维数组
        int[][] arr1 = new int[3][4];
        arr1[0][0] = 1;
        arr1[0][1] = 2;
        arr1[1][0] = 3;
        
        // 方式2：初始化二维数组
        int[][] arr2 = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        // 方式3：不规则二维数组（每行长度不同）
        int[][] arr3 = new int[3][];
        arr3[0] = new int[2];
        arr3[1] = new int[3];
        arr3[2] = new int[4];
        
        // 遍历二维数组
        System.out.println("arr2的内容:");
        for (int i = 0; i < arr2.length; i++) {
            for (int j = 0; j < arr2[i].length; j++) {
                System.out.print(arr2[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```

#### 二维数组的遍历

```java
public class TwoDimensionTraversal {
    public static void main(String[] args) {
        int[][] arr = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        // 方式1：传统for循环
        System.out.println("方式1：传统for循环");
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++) {
                System.out.print(arr[i][j] + " ");
            }
            System.out.println();
        }
        
        // 方式2：增强for循环
        System.out.println("方式2：增强for循环");
        for (int[] row : arr) {
            for (int element : row) {
                System.out.print(element + " ");
            }
            System.out.println();
        }
        
        // 方式3：使用Arrays.deepToString()
        System.out.println("方式3：Arrays.deepToString()");
        System.out.println(Arrays.deepToString(arr));
    }
}
```

### 3.2 三维数组

三维数组可以理解为"二维数组的数组"。

**示例代码：**
```java
public class ThreeDimensionArray {
    public static void main(String[] args) {
        // 创建三维数组：2个二维数组，每个3行4列
        int[][][] arr = new int[2][3][4];
        
        // 初始化
        int value = 1;
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++) {
                for (int k = 0; k < arr[i][j].length; k++) {
                    arr[i][j][k] = value++;
                }
            }
        }
        
        // 遍历
        for (int i = 0; i < arr.length; i++) {
            System.out.println("第" + (i + 1) + "个二维数组:");
            for (int j = 0; j < arr[i].length; j++) {
                for (int k = 0; k < arr[i][j].length; k++) {
                    System.out.print(arr[i][j][k] + " ");
                }
                System.out.println();
            }
            System.out.println();
        }
    }
}
```

---

## 四、Arrays工具类的常用方法

`java.util.Arrays`类提供了很多操作数组的静态方法。

### 4.1 toString() - 数组转字符串

```java
import java.util.Arrays;

int[] arr = {1, 2, 3, 4, 5};
String str = Arrays.toString(arr);
System.out.println(str);  // 输出：[1, 2, 3, 4, 5]
```

### 4.2 sort() - 数组排序

```java
import java.util.Arrays;

int[] arr = {5, 2, 8, 1, 9};
Arrays.sort(arr);
System.out.println(Arrays.toString(arr));  // 输出：[1, 2, 5, 8, 9]
```

### 4.3 binarySearch() - 二分查找

**注意：** 使用前数组必须已排序！

```java
import java.util.Arrays;

int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9};
int index = Arrays.binarySearch(arr, 5);
System.out.println("元素5的索引: " + index);  // 输出：4

// 如果未找到，返回负数
int index2 = Arrays.binarySearch(arr, 10);
System.out.println("元素10的索引: " + index2);  // 输出：-10
```

### 4.4 fill() - 填充数组

```java
import java.util.Arrays;

int[] arr = new int[5];
Arrays.fill(arr, 10);
System.out.println(Arrays.toString(arr));  // 输出：[10, 10, 10, 10, 10]

// 填充指定范围
int[] arr2 = new int[5];
Arrays.fill(arr2, 1, 3, 99);  // 将索引1到2（不包括3）填充为99
System.out.println(Arrays.toString(arr2));  // 输出：[0, 99, 99, 0, 0]
```

### 4.5 copyOf() - 复制数组

```java
import java.util.Arrays;

int[] arr1 = {1, 2, 3, 4, 5};
int[] arr2 = Arrays.copyOf(arr1, arr1.length);
int[] arr3 = Arrays.copyOf(arr1, 3);  // 只复制前3个元素
int[] arr4 = Arrays.copyOf(arr1, 10);  // 复制并扩展到10个元素，多出的为0

System.out.println(Arrays.toString(arr2));  // [1, 2, 3, 4, 5]
System.out.println(Arrays.toString(arr3));  // [1, 2, 3]
System.out.println(Arrays.toString(arr4));  // [1, 2, 3, 4, 5, 0, 0, 0, 0, 0]
```

### 4.6 copyOfRange() - 复制数组指定范围

```java
import java.util.Arrays;

int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9};
int[] arr2 = Arrays.copyOfRange(arr, 2, 5);  // 复制索引2到4（不包括5）
System.out.println(Arrays.toString(arr2));  // 输出：[3, 4, 5]
```

### 4.7 equals() - 比较数组

```java
import java.util.Arrays;

int[] arr1 = {1, 2, 3};
int[] arr2 = {1, 2, 3};
int[] arr3 = {1, 2, 4};

System.out.println(Arrays.equals(arr1, arr2));  // true
System.out.println(Arrays.equals(arr1, arr3));  // false
```

### 4.8 deepEquals() - 深度比较多维数组

```java
import java.util.Arrays;

int[][] arr1 = {{1, 2}, {3, 4}};
int[][] arr2 = {{1, 2}, {3, 4}};
int[][] arr3 = {{1, 2}, {3, 5}};

System.out.println(Arrays.deepEquals(arr1, arr2));  // true
System.out.println(Arrays.deepEquals(arr1, arr3));  // false
```

### 4.9 综合示例

```java
import java.util.Arrays;

public class ArraysMethodsDemo {
    public static void main(String[] args) {
        int[] arr = {5, 2, 8, 1, 9, 3};
        
        // 1. 转字符串
        System.out.println("原数组: " + Arrays.toString(arr));
        
        // 2. 排序
        Arrays.sort(arr);
        System.out.println("排序后: " + Arrays.toString(arr));
        
        // 3. 二分查找
        int index = Arrays.binarySearch(arr, 5);
        System.out.println("元素5的索引: " + index);
        
        // 4. 复制数组
        int[] copy = Arrays.copyOf(arr, arr.length);
        System.out.println("复制数组: " + Arrays.toString(copy));
        
        // 5. 比较数组
        System.out.println("数组相等? " + Arrays.equals(arr, copy));
        
        // 6. 填充数组
        int[] filled = new int[5];
        Arrays.fill(filled, 10);
        System.out.println("填充后: " + Arrays.toString(filled));
    }
}
```

---

## 五、练习题

### 练习题1：数组基础操作
请编写代码实现以下功能：
1. 创建一个长度为10的int数组
2. 使用循环给数组赋值：arr[i] = i * 2
3. 计算数组中所有元素的和
4. 找出数组中的最大值和最小值

**参考答案：**
```java
public class Exercise1 {
    public static void main(String[] args) {
        // 1. 创建数组
        int[] arr = new int[10];
        
        // 2. 赋值
        for (int i = 0; i < arr.length; i++) {
            arr[i] = i * 2;
        }
        
        // 3. 计算和
        int sum = 0;
        for (int num : arr) {
            sum += num;
        }
        System.out.println("数组元素和: " + sum);
        
        // 4. 找最大值和最小值
        int max = arr[0];
        int min = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
            if (arr[i] < min) {
                min = arr[i];
            }
        }
        System.out.println("最大值: " + max);
        System.out.println("最小值: " + min);
    }
}
```

### 练习题2：数组查找和删除
请编写代码实现以下功能：
1. 创建一个数组：{10, 20, 30, 40, 50}
2. 查找值为30的元素，如果找到则删除（后面的元素前移）
3. 打印删除后的数组

**参考答案：**
```java
import java.util.Arrays;

public class Exercise2 {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        int target = 30;
        int index = -1;
        
        // 查找元素
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                index = i;
                break;
            }
        }
        
        if (index != -1) {
            // 删除元素：后面的元素前移
            for (int i = index; i < arr.length - 1; i++) {
                arr[i] = arr[i + 1];
            }
            arr[arr.length - 1] = 0;  // 最后一个元素置0
            
            System.out.println("删除后的数组: " + Arrays.toString(arr));
        } else {
            System.out.println("未找到元素 " + target);
        }
    }
}
```

### 练习题3：数组排序
请编写代码实现以下功能：
1. 创建一个数组：{64, 34, 25, 12, 22, 11, 90}
2. 使用冒泡排序算法对数组进行排序
3. 打印排序后的数组

**参考答案：**
```java
import java.util.Arrays;

public class Exercise3 {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("排序前: " + Arrays.toString(arr));
        
        // 冒泡排序
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 交换
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        
        System.out.println("排序后: " + Arrays.toString(arr));
    }
}
```

### 练习题4：二维数组操作
请编写代码实现以下功能：
1. 创建一个3x3的二维数组，存储九九乘法表
2. 遍历并打印这个二维数组

**参考答案：**
```java
public class Exercise4 {
    public static void main(String[] args) {
        // 创建3x3二维数组
        int[][] multiplicationTable = new int[3][3];
        
        // 填充九九乘法表（前3x3）
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                multiplicationTable[i][j] = (i + 1) * (j + 1);
            }
        }
        
        // 打印
        System.out.println("九九乘法表（3x3）:");
        for (int i = 0; i < multiplicationTable.length; i++) {
            for (int j = 0; j < multiplicationTable[i].length; j++) {
                System.out.printf("%d x %d = %d\t", 
                    (i + 1), (j + 1), multiplicationTable[i][j]);
            }
            System.out.println();
        }
    }
}
```

### 练习题5：Arrays工具类使用
请使用Arrays工具类的方法实现以下功能：
1. 创建一个数组：{5, 2, 8, 1, 9, 3}
2. 对数组进行排序
3. 查找元素8的位置
4. 复制数组的前3个元素到新数组
5. 比较原数组和复制数组是否相等

**参考答案：**
```java
import java.util.Arrays;

public class Exercise5 {
    public static void main(String[] args) {
        int[] arr = {5, 2, 8, 1, 9, 3};
        
        System.out.println("原数组: " + Arrays.toString(arr));
        
        // 排序
        Arrays.sort(arr);
        System.out.println("排序后: " + Arrays.toString(arr));
        
        // 查找元素8
        int index = Arrays.binarySearch(arr, 8);
        System.out.println("元素8的索引: " + index);
        
        // 复制前3个元素
        int[] copy = Arrays.copyOf(arr, 3);
        System.out.println("复制的前3个元素: " + Arrays.toString(copy));
        
        // 比较数组
        int[] arrCopy = Arrays.copyOf(arr, arr.length);
        System.out.println("原数组和复制数组相等? " + Arrays.equals(arr, arrCopy));
    }
}
```

### 练习题6：综合应用
请编写一个程序，实现以下功能：
1. 创建一个长度为20的数组，存储1-20的随机数（允许重复）
2. 统计每个数字出现的次数
3. 找出出现次数最多的数字

**参考答案：**
```java
import java.util.Arrays;
import java.util.Random;

public class Exercise6 {
    public static void main(String[] args) {
        Random random = new Random();
        int[] arr = new int[20];
        
        // 生成1-20的随机数
        for (int i = 0; i < arr.length; i++) {
            arr[i] = random.nextInt(20) + 1;
        }
        
        System.out.println("生成的数组: " + Arrays.toString(arr));
        
        // 统计每个数字出现的次数
        int[] count = new int[21];  // 索引0不使用，1-20对应数字1-20
        for (int num : arr) {
            count[num]++;
        }
        
        // 找出出现次数最多的数字
        int maxCount = 0;
        int maxNum = 0;
        for (int i = 1; i <= 20; i++) {
            if (count[i] > maxCount) {
                maxCount = count[i];
                maxNum = i;
            }
        }
        
        System.out.println("出现次数最多的数字: " + maxNum);
        System.out.println("出现次数: " + maxCount);
    }
}
```

---

## 六、数组知识对比分析表

### 6.1 一维数组与多维数组对比

| 特性 | 一维数组 | 二维数组 | 三维数组 |
|------|---------|---------|---------|
| **声明方式** | `int[] arr;` | `int[][] arr;` | `int[][][] arr;` |
| **创建方式** | `new int[5]` | `new int[3][4]` | `new int[2][3][4]` |
| **初始化** | `{1,2,3}` | `{{1,2},{3,4}}` | `{{{1,2},{3,4}},{{5,6},{7,8}}}` |
| **访问元素** | `arr[0]` | `arr[0][1]` | `arr[0][1][2]` |
| **长度获取** | `arr.length` | `arr.length`（行数）<br>`arr[0].length`（列数） | `arr.length`（第一维）<br>`arr[0].length`（第二维）<br>`arr[0][0].length`（第三维） |
| **内存结构** | 连续线性存储 | 数组的数组 | 二维数组的数组 |
| **适用场景** | 线性数据存储 | 矩阵、表格数据 | 三维空间数据 |
| **遍历方式** | 单层循环 | 双层循环 | 三层循环 |

### 6.2 数组创建方式对比

| 创建方式 | 语法 | 优点 | 缺点 | 适用场景 |
|---------|------|------|------|----------|
| **声明后分配** | `int[] arr;`<br>`arr = new int[5];` | 灵活，可延迟分配 | 代码较长 | 需要条件判断时 |
| **声明时分配** | `int[] arr = new int[5];` | 简洁明了 | 元素为默认值 | 已知长度但值未知 |
| **声明时初始化** | `int[] arr = {1,2,3};` | 最简洁，直接赋值 | 长度固定 | 已知所有元素值 |
| **new初始化** | `int[] arr = new int[]{1,2,3};` | 可配合方法调用 | 稍显冗余 | 作为方法参数时 |

### 6.3 数组遍历方式对比

| 遍历方式 | 语法 | 优点 | 缺点 | 适用场景 |
|---------|------|------|------|----------|
| **传统for循环** | `for(int i=0; i<arr.length; i++)` | 可访问索引，可修改元素 | 代码较长 | 需要索引或修改元素 |
| **增强for循环** | `for(int num : arr)` | 代码简洁，不易出错 | 无法访问索引，无法修改元素 | 只读遍历 |
| **Arrays.toString()** | `Arrays.toString(arr)` | 快速打印 | 仅用于打印 | 调试输出 |

### 6.4 Arrays工具类方法对比

| 方法 | 功能 | 返回值 | 是否修改原数组 | 时间复杂度 | 使用场景 |
|------|------|--------|---------------|-----------|----------|
| **toString()** | 数组转字符串 | String | 否 | O(n) | 打印数组 |
| **sort()** | 数组排序 | void | 是 | O(n log n) | 数组排序 |
| **binarySearch()** | 二分查找 | int（索引或负数） | 否 | O(log n) | 有序数组查找 |
| **fill()** | 填充数组 | void | 是 | O(n) | 初始化数组 |
| **copyOf()** | 复制数组 | 新数组 | 否 | O(n) | 数组复制 |
| **copyOfRange()** | 复制指定范围 | 新数组 | 否 | O(n) | 部分复制 |
| **equals()** | 比较数组 | boolean | 否 | O(n) | 数组比较 |
| **deepEquals()** | 深度比较 | boolean | 否 | O(n) | 多维数组比较 |

### 6.5 数组操作复杂度对比

| 操作 | 时间复杂度 | 空间复杂度 | 说明 |
|------|-----------|-----------|------|
| **访问元素** | O(1) | O(1) | 通过索引直接访问 |
| **查找元素（线性）** | O(n) | O(1) | 遍历查找 |
| **查找元素（二分）** | O(log n) | O(1) | 需要数组已排序 |
| **插入元素** | O(n) | O(1) | 需要移动后续元素 |
| **删除元素** | O(n) | O(1) | 需要移动后续元素 |
| **数组排序** | O(n log n) | O(1) | 快速排序/归并排序 |
| **数组复制** | O(n) | O(n) | 需要新数组空间 |

### 6.6 数组类型默认值对比

| 数组类型 | 默认值 | 示例 |
|---------|--------|------|
| **byte[]** | 0 | `byte[] arr = new byte[3];` → `[0, 0, 0]` |
| **short[]** | 0 | `short[] arr = new short[3];` → `[0, 0, 0]` |
| **int[]** | 0 | `int[] arr = new int[3];` → `[0, 0, 0]` |
| **long[]** | 0L | `long[] arr = new long[3];` → `[0, 0, 0]` |
| **float[]** | 0.0f | `float[] arr = new float[3];` → `[0.0, 0.0, 0.0]` |
| **double[]** | 0.0d | `double[] arr = new double[3];` → `[0.0, 0.0, 0.0]` |
| **char[]** | '\u0000' | `char[] arr = new char[3];` → `['\u0000', '\u0000', '\u0000']` |
| **boolean[]** | false | `boolean[] arr = new boolean[3];` → `[false, false, false]` |
| **引用类型[]** | null | `String[] arr = new String[3];` → `[null, null, null]` |

---

## 七、拓展：数组与String和char类的联动用法

### 7.1 String转char数组

#### 方法1：使用toCharArray()
```java
String str = "Hello";
char[] charArray = str.toCharArray();
System.out.println(Arrays.toString(charArray));  // 输出：[H, e, l, l, o]
```

#### 方法2：使用charAt()逐个获取

```java
String str = "Hello";
char[] charArray = new char[str.length()];
for (int i = 0; i < str.length(); i++) {
    charArray[i] = str.charAt(i);
}
```

**示例代码：**
```java
import java.util.Arrays;

public class StringToCharArray {
    public static void main(String[] args) {
        String str = "Java编程";
        
        // 方法1：toCharArray()
        char[] arr1 = str.toCharArray();
        System.out.println("方法1: " + Arrays.toString(arr1));
        
        // 方法2：charAt()
        char[] arr2 = new char[str.length()];
        for (int i = 0; i < str.length(); i++) {
            arr2[i] = str.charAt(i);
        }
        System.out.println("方法2: " + Arrays.toString(arr2));
        
        // 遍历字符数组
        for (char c : arr1) {
            System.out.print(c + " ");
        }
    }
}
```

### 7.2 char数组转String

#### 方法1：使用String构造函数
```java
char[] charArray = {'H', 'e', 'l', 'l', 'o'};
String str = new String(charArray);
System.out.println(str);  // 输出：Hello
```

#### 方法2：使用String.valueOf()
```java
char[] charArray = {'H', 'e', 'l', 'l', 'o'};
String str = String.valueOf(charArray);
System.out.println(str);  // 输出：Hello
```

#### 方法3：使用StringBuilder
```java
char[] charArray = {'H', 'e', 'l', 'l', 'o'};
StringBuilder sb = new StringBuilder();
for (char c : charArray) {
    sb.append(c);
}
String str = sb.toString();
```

**示例代码：**
```java
public class CharArrayToString {
    public static void main(String[] args) {
        char[] charArray = {'J', 'a', 'v', 'a', '编', '程'};
        
        // 方法1：String构造函数
        String str1 = new String(charArray);
        System.out.println("方法1: " + str1);
        
        // 方法2：String.valueOf()
        String str2 = String.valueOf(charArray);
        System.out.println("方法2: " + str2);
        
        // 方法3：指定范围转换
        String str3 = new String(charArray, 0, 4);  // 从索引0开始，取4个字符
        System.out.println("方法3（前4个字符）: " + str3);
    }
}
```

### 7.3 String与char数组的常用操作

#### 字符串反转
```java
public class StringReverse {
    public static void main(String[] args) {
        String str = "Hello";
        
        // 方法1：使用StringBuilder
        String reversed1 = new StringBuilder(str).reverse().toString();
        System.out.println("方法1: " + reversed1);
        
        // 方法2：转换为char数组后反转
        char[] charArray = str.toCharArray();
        for (int i = 0; i < charArray.length / 2; i++) {
            char temp = charArray[i];
            charArray[i] = charArray[charArray.length - 1 - i];
            charArray[charArray.length - 1 - i] = temp;
        }
        String reversed2 = new String(charArray);
        System.out.println("方法2: " + reversed2);
    }
}
```

#### 统计字符出现次数
```java
public class CharCount {
    public static void main(String[] args) {
        String str = "Hello World";
        char target = 'l';
        
        // 方法1：使用charAt()
        int count1 = 0;
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) == target) {
                count1++;
            }
        }
        System.out.println("字符 '" + target + "' 出现次数（方法1）: " + count1);
        
        // 方法2：转换为char数组
        char[] charArray = str.toCharArray();
        int count2 = 0;
        for (char c : charArray) {
            if (c == target) {
                count2++;
            }
        }
        System.out.println("字符 '" + target + "' 出现次数（方法2）: " + count2);
    }
}
```

#### 字符串去重
```java
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.Set;

public class StringDeduplication {
    public static void main(String[] args) {
        String str = "Hello World";
        
        // 方法1：使用Set去重
        char[] charArray = str.toCharArray();
        Set<Character> set = new LinkedHashSet<>();
        for (char c : charArray) {
            set.add(c);
        }
        StringBuilder sb = new StringBuilder();
        for (Character c : set) {
            sb.append(c);
        }
        String result1 = sb.toString();
        System.out.println("去重后（方法1）: " + result1);
        
        // 方法2：手动去重
        StringBuilder sb2 = new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            if (sb2.indexOf(String.valueOf(c)) == -1) {
                sb2.append(c);
            }
        }
        String result2 = sb2.toString();
        System.out.println("去重后（方法2）: " + result2);
    }
}
```

### 7.4 字符串分割与数组合并

#### 字符串分割为数组
```java
public class StringSplit {
    public static void main(String[] args) {
        String str = "apple,banana,orange";
        
        // 使用split()方法
        String[] arr = str.split(",");
        System.out.println("分割后的数组:");
        for (String s : arr) {
            System.out.println(s);
        }
        
        // 分割为char数组（每个字符）
        char[] charArray = str.toCharArray();
        System.out.println("字符数组: " + Arrays.toString(charArray));
    }
}
```

#### 字符数组合并为字符串
```java
import java.util.Arrays;

public class ArrayJoin {
    public static void main(String[] args) {
        String[] arr = {"apple", "banana", "orange"};
        
        // 方法1：使用String.join()（Java 8+）
        String joined1 = String.join(",", arr);
        System.out.println("方法1: " + joined1);
        
        // 方法2：使用StringBuilder
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < arr.length; i++) {
            sb.append(arr[i]);
            if (i < arr.length - 1) {
                sb.append(",");
            }
        }
        String joined2 = sb.toString();
        System.out.println("方法2: " + joined2);
        
        // 字符数组合并
        char[] charArray = {'H', 'e', 'l', 'l', 'o'};
        String str = new String(charArray);
        System.out.println("字符数组合并: " + str);
    }
}
```

### 7.5 字符串与字符数组的查找和替换

#### 查找字符位置
```java
public class CharSearch {
    public static void main(String[] args) {
        String str = "Hello World";
        char target = 'o';
        
        // 查找所有字符位置
        System.out.println("字符 '" + target + "' 的位置:");
        char[] charArray = str.toCharArray();
        for (int i = 0; i < charArray.length; i++) {
            if (charArray[i] == target) {
                System.out.println("索引: " + i);
            }
        }
        
        // 使用indexOf()方法
        int index = str.indexOf(target);
        System.out.println("第一个出现位置: " + index);
    }
}
```

#### 替换字符
```java
public class CharReplace {
    public static void main(String[] args) {
        String str = "Hello World";
        
        // 方法1：使用replace()
        String replaced1 = str.replace('o', '0');
        System.out.println("方法1: " + replaced1);
        
        // 方法2：转换为char数组后替换
        char[] charArray = str.toCharArray();
        for (int i = 0; i < charArray.length; i++) {
            if (charArray[i] == 'o') {
                charArray[i] = '0';
            }
        }
        String replaced2 = new String(charArray);
        System.out.println("方法2: " + replaced2);
    }
}
```

### 7.6 字符串排序

```java
import java.util.Arrays;

public class StringSort {
    public static void main(String[] args) {
        String str = "hello";
        
        // 转换为char数组并排序
        char[] charArray = str.toCharArray();
        Arrays.sort(charArray);
        String sorted = new String(charArray);
        System.out.println("排序前: " + str);
        System.out.println("排序后: " + sorted);
        
        // 字符串数组排序
        String[] strArray = {"banana", "apple", "orange"};
        Arrays.sort(strArray);
        System.out.println("字符串数组排序: " + Arrays.toString(strArray));
    }
}
```

---

## 八、数组与String/char联动练习题

### 练习题1：字符串转字符数组
请编写代码实现以下功能：
1. 将字符串"Java编程"转换为char数组
2. 遍历char数组，打印每个字符及其ASCII码值
3. 将char数组转换回String

**参考答案：**
```java
public class Exercise1 {
    public static void main(String[] args) {
        String str = "Java编程";
        
        // 转换为char数组
        char[] charArray = str.toCharArray();
        
        // 遍历并打印
        System.out.println("字符及其ASCII码值:");
        for (char c : charArray) {
            System.out.println("字符: " + c + ", ASCII码: " + (int)c);
        }
        
        // 转换回String
        String result = new String(charArray);
        System.out.println("转换回String: " + result);
    }
}
```

### 练习题2：字符串反转
请使用char数组实现字符串反转功能。

**参考答案：**
```java
public class Exercise2 {
    public static void main(String[] args) {
        String str = "Hello World";
        System.out.println("原字符串: " + str);
        
        // 转换为char数组
        char[] charArray = str.toCharArray();
        
        // 反转
        for (int i = 0; i < charArray.length / 2; i++) {
            char temp = charArray[i];
            charArray[i] = charArray[charArray.length - 1 - i];
            charArray[charArray.length - 1 - i] = temp;
        }
        
        // 转换回String
        String reversed = new String(charArray);
        System.out.println("反转后: " + reversed);
    }
}
```

### 练习题3：统计字符出现次数
请编写代码统计字符串中每个字符出现的次数，使用char数组实现。

**参考答案：**
```java
import java.util.Arrays;

public class Exercise3 {
    public static void main(String[] args) {
        String str = "Hello World";
        char[] charArray = str.toCharArray();
        
        // 统计每个字符出现次数
        int[] count = new int[128];  // ASCII码范围0-127
        
        for (char c : charArray) {
            if (c != ' ') {  // 忽略空格
                count[c]++;
            }
        }
        
        // 输出统计结果
        System.out.println("字符出现次数统计:");
        for (int i = 0; i < count.length; i++) {
            if (count[i] > 0) {
                System.out.println("字符 '" + (char)i + "' 出现 " + count[i] + " 次");
            }
        }
    }
}
```

### 练习题4：字符串去重
请使用char数组实现字符串去重功能，保持字符的原始顺序。

**参考答案：**
```java
public class Exercise4 {
    public static void main(String[] args) {
        String str = "Hello World";
        System.out.println("原字符串: " + str);
        
        char[] charArray = str.toCharArray();
        StringBuilder sb = new StringBuilder();
        
        for (char c : charArray) {
            // 如果结果字符串中不包含当前字符，则添加
            if (sb.indexOf(String.valueOf(c)) == -1) {
                sb.append(c);
            }
        }
        
        String result = sb.toString();
        System.out.println("去重后: " + result);
    }
}
```

### 练习题5：字符串排序
请将字符串转换为char数组，对数组进行排序，然后转换回字符串。

**参考答案：**
```java
import java.util.Arrays;

public class Exercise5 {
    public static void main(String[] args) {
        String str = "hello";
        System.out.println("原字符串: " + str);
        
        // 转换为char数组
        char[] charArray = str.toCharArray();
        
        // 排序
        Arrays.sort(charArray);
        
        // 转换回String
        String sorted = new String(charArray);
        System.out.println("排序后: " + sorted);
    }
}
```

### 练习题6：综合应用
请编写一个程序，实现以下功能：
1. 输入一个字符串
2. 统计字符串中字母、数字、空格和其他字符的个数
3. 将字符串转换为char数组，对字母进行排序
4. 输出排序后的字符串

**参考答案：**
```java
import java.util.Arrays;

public class Exercise6 {
    public static void main(String[] args) {
        String str = "Hello World 123!";
        System.out.println("原字符串: " + str);
        
        char[] charArray = str.toCharArray();
        int letters = 0, digits = 0, spaces = 0, others = 0;
        
        // 统计各类字符
        for (char c : charArray) {
            if (Character.isLetter(c)) {
                letters++;
            } else if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isSpaceChar(c)) {
                spaces++;
            } else {
                others++;
            }
        }
        
        System.out.println("字母个数: " + letters);
        System.out.println("数字个数: " + digits);
        System.out.println("空格个数: " + spaces);
        System.out.println("其他字符个数: " + others);
        
        // 提取字母并排序
        StringBuilder lettersOnly = new StringBuilder();
        for (char c : charArray) {
            if (Character.isLetter(c)) {
                lettersOnly.append(c);
            }
        }
        
        char[] letterArray = lettersOnly.toString().toCharArray();
        Arrays.sort(letterArray);
        String sortedLetters = new String(letterArray);
        
        System.out.println("排序后的字母: " + sortedLetters);
    }
}
```

---

## 九、数组与String/char联动用法对比分析表

### 9.1 String与char数组转换方法对比

| 转换方向 | 方法 | 语法 | 优点 | 缺点 | 适用场景 |
|---------|------|------|------|------|----------|
| **String → char[]** | toCharArray() | `str.toCharArray()` | 简洁高效 | 创建新数组 | 需要修改字符时 |
| **String → char[]** | charAt()循环 | `for(int i=0; i<str.length(); i++)` | 可控制过程 | 代码较长 | 需要特殊处理时 |
| **char[] → String** | String构造函数 | `new String(charArray)` | 简洁直接 | 无 | 最常用方法 |
| **char[] → String** | String.valueOf() | `String.valueOf(charArray)` | 静态方法 | 无 | 推荐使用 |
| **char[] → String** | StringBuilder | `sb.append(c).toString()` | 灵活 | 代码较长 | 需要拼接时 |

### 9.2 字符串操作方式对比

| 操作 | 使用String方法 | 使用char数组 | 性能 | 灵活性 | 推荐 |
|------|---------------|-------------|------|--------|------|
| **字符串反转** | StringBuilder.reverse() | 数组交换元素 | char数组更快 | char数组更灵活 | char数组 |
| **字符查找** | indexOf() | 循环遍历 | 相近 | String方法更简洁 | String方法 |
| **字符替换** | replace() | 数组修改 | 相近 | String方法更简洁 | String方法 |
| **字符统计** | 循环charAt() | 数组遍历 | 相近 | 相近 | 均可 |
| **字符串排序** | 无直接方法 | Arrays.sort() | char数组更快 | char数组更灵活 | char数组 |
| **字符串去重** | 需要辅助类 | 数组+逻辑 | 相近 | char数组更灵活 | char数组 |

### 9.3 字符处理常用方法对比

| 功能 | String方法 | char数组方法 | 示例 |
|------|-----------|-------------|------|
| **获取字符** | charAt(index) | array[index] | `str.charAt(0)` vs `arr[0]` |
| **获取长度** | length() | array.length | `str.length()` vs `arr.length` |
| **查找字符** | indexOf(char) | 循环查找 | `str.indexOf('a')` vs 手动循环 |
| **替换字符** | replace(old, new) | 数组赋值 | `str.replace('a','A')` vs `arr[i]='A'` |
| **子字符串** | substring() | Arrays.copyOfRange() | `str.substring(1,3)` vs `Arrays.copyOfRange(arr,1,3)` |
| **转换为数组** | toCharArray() | - | `str.toCharArray()` |
| **数组转字符串** | new String(arr) | - | `new String(arr)` |

### 9.4 字符串与数组操作复杂度对比

| 操作 | String方法 | char数组方法 | 时间复杂度 | 空间复杂度 |
|------|-----------|-------------|-----------|-----------|
| **字符访问** | charAt(i) | arr[i] | O(1) | O(1) |
| **字符串反转** | StringBuilder.reverse() | 数组交换 | O(n) | O(n) |
| **字符查找** | indexOf() | 线性查找 | O(n) | O(1) |
| **字符替换** | replace() | 数组修改 | O(n) | O(n) |
| **字符串排序** | 需转数组 | Arrays.sort() | O(n log n) | O(n) |
| **字符串分割** | split() | 手动处理 | O(n) | O(n) |

### 9.5 实际应用场景推荐

| 应用场景 | 推荐方法 | 原因 |
|---------|---------|------|
| **字符串反转** | char数组 | 性能好，代码清晰 |
| **字符串排序** | char数组 | 可直接使用Arrays.sort() |
| **字符统计** | char数组或charAt() | 灵活，性能相近 |
| **字符串替换** | String.replace() | 简洁，易读 |
| **字符串查找** | String.indexOf() | 简洁，功能完善 |
| **字符串分割** | String.split() | 功能强大，支持正则 |
| **字符串拼接** | StringBuilder | 性能最优 |
| **字符去重** | char数组+逻辑 | 灵活可控 |
| **字符串比较** | String.equals() | 简洁高效 |
| **大小写转换** | String.toUpperCase()/toLowerCase() | 简洁，支持国际化 |

### 9.6 最佳实践总结

| 实践建议 | 说明 | 示例 |
|---------|------|------|
| **优先使用String方法** | 对于常见操作，String方法更简洁 | `str.replace('a','A')` |
| **需要修改时用char数组** | String不可变，修改需用char数组 | 字符串反转、排序 |
| **注意性能差异** | 大量操作时考虑性能 | 循环中避免频繁创建String |
| **合理使用StringBuilder** | 大量字符串拼接时使用 | `sb.append(str)` |
| **利用Arrays工具类** | char数组操作使用Arrays | `Arrays.sort(charArray)` |
| **注意Unicode字符** | char是16位，支持Unicode | 处理中文等多字节字符 |
| **避免不必要的转换** | 减少String和char数组的转换 | 尽量在同一类型下操作 |

---

## 十、总结

### 10.1 数组核心要点

1. **数组特点**：固定长度、相同类型、索引访问、引用类型
2. **创建方式**：三种声明方式，推荐使用`类型[] 数组名`
3. **默认值**：数值类型为0，boolean为false，引用类型为null
4. **遍历方式**：传统for、增强for、Arrays.toString()
5. **多维数组**：数组的数组，支持不规则数组

### 10.2 Arrays工具类要点

1. **常用方法**：toString、sort、binarySearch、fill、copyOf等
2. **排序查找**：sort()排序，binarySearch()查找（需先排序）
3. **数组复制**：copyOf()和copyOfRange()创建新数组
4. **数组比较**：equals()比较一维，deepEquals()比较多维

### 10.3 String与char数组联动要点

1. **转换方法**：toCharArray()和new String()是最常用方法
2. **操作选择**：简单操作用String方法，复杂修改用char数组
3. **性能考虑**：大量操作时注意性能，合理使用StringBuilder
4. **实际应用**：字符串反转、排序、统计等场景灵活选择方法

### 10.4 学习建议

1. 熟练掌握数组的创建、初始化和遍历
2. 理解一维和多维数组的内存结构
3. 熟练使用Arrays工具类的常用方法
4. 掌握String与char数组之间的转换
5. 在实际编程中根据需求选择合适的数据结构和方法
6. 注意数组边界，避免ArrayIndexOutOfBoundsException

---

**教案编写完成！**

