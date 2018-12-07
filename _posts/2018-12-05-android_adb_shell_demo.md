---
layout: post
title: "android使用adbshell实现模拟点击"
date: 2018-12-05
category: android
tags: android
---

之前有写过常用的adb shell 的命令。  
然后现在想使用这些adb shell 实现一个demo。  

## 一些思路

首先我的想法是通过坐标，然后去点击。  
然后在找这些命令的时候，发现一个很有意思的命令。  
`uiautomator dump /sdcard/dump.xml`

	➜  ~ adb shell uiautomator dump /sdcard/dump.xml
	UI hierchary dumped to: /sdcard/dump.xml

这个命令会在你的手机存储中生成一个dump.xml文件  

## 在android代码中调用adb shell

前提：android手机需要root  


    public final class RootCmd {

        public static final String TAG = "RootCmd";
        private static boolean mHaveRoot = false;
        /**
         *   判断机器Android是否已经root，即是否获取root权限
         */
        public static boolean haveRoot() {
            if (!mHaveRoot) {
                int ret = execRootCmdSilent("echo test"); // 通过执行测试命令来检测
                if (ret != -1) {
                    Log.e(TAG, "have root!");
                    mHaveRoot = true;
                } else {
                    Log.e(TAG, "not root!");
                }
            } else {
                Log.e(TAG, "mHaveRoot = true, have root!");
            }
            return mHaveRoot;
        }

        /**
         * 执行命令并且输出结果
         */
        public static String execRootCmd(String cmd) {
            String result = "";
            DataOutputStream dos = null;
            DataInputStream dis = null;

            try {
                Process p = Runtime.getRuntime().exec("su");// 经过Root处理的android系统即有su命令
                dos = new DataOutputStream(p.getOutputStream());
                dis = new DataInputStream(p.getInputStream());

                Log.e(TAG, cmd);
                dos.writeBytes(cmd + "\n");
                dos.flush();
                dos.writeBytes("exit\n");
                dos.flush();
                String line = null;
                while ((line = dis.readLine()) != null) {
                    Log.d("result", line);
                    result += line;
                }
                p.waitFor();
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (dos != null) {
                    try {
                        dos.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                if (dis != null) {
                    try {
                        dis.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            return result;
        }

        /**
         * 执行命令但不关注结果输出
         */
        public static int execRootCmdSilent(String cmd) {
            int result = -1;
            DataOutputStream dos = null;

            try {
                Process p = Runtime.getRuntime().exec("su");
                dos = new DataOutputStream(p.getOutputStream());

                Log.e(TAG, cmd);
                dos.writeBytes(cmd + "\n");
                dos.flush();
                dos.writeBytes("exit\n");
                dos.flush();
                p.waitFor();
                result = p.exitValue();
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (dos != null) {
                    try {
                        dos.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            return result;
        }

    }

    命令执行： 

    RootCmd.execRootCmdSilent("am start com.songheng.eastnews/com.oa.eastfirst.activity.WelcomeActivity"); // 打开app


######未完