---
layout: post
title: "android_handler_code"
date: 2019-01-09
category: android
tags: android
---

	好用的handler

	public class MainActivity2 extends Activity {

	    private TextView text_view = null;
	    private Button start = null;
	    private Button end = null;
	    private int count = 0;
	    private boolean flag=true;
	    // 使用handler时首先要创建一个handler
	    Handler handler = new Handler();
	    // 要用handler来处理多线程可以使用runnable接口，这里先定义该接口
	    // 线程中运行该接口的run函数
	    Runnable update_thread = new Runnable() {


	        @Override
	        public void run() {
	            Log.e("shaomiao", "thread");

	            switch (count) {
	                case 0:
	                    for (int i = 0; i <30 ; i++) {
	                        Log.e("shaomiao", "threadaaaa:" + count + Thread.currentThread().getName());
	                        try {
	                            Thread.sleep(1000);
	                        } catch (InterruptedException e) {
	                            e.printStackTrace();
	                        }
	                    }
	                    Log.e("shaomiao", "thread00000" + count + Thread.currentThread().getName());
	                    Log.e("shaomiao", "thread00000000" + count + Thread.currentThread().getName());
	                    Log.e("shaomiao", "thread000000000" + count + Thread.currentThread().getName());
	                    Log.e("shaomiao", "thread000000000" + count + Thread.currentThread().getName());
	                    Log.e("shaomiao", "thread0000000000" + count + Thread.currentThread().getName());
	                    break;
	                case 1:
	                    Log.e("shaomiao", "thread1111111" + count + Thread.currentThread().getName());
	                    break;
	                case 2:
	                    Log.e("shaomiao", "thread22222222" + count + Thread.currentThread().getName());
	                    break;
	                case 3:
	                    Log.e("shaomiao", "thread33333333" + count + Thread.currentThread().getName());
	                    break;
	                case 4:
	                    Log.e("shaomiao", "thread444444" + count + Thread.currentThread().getName());
	                    break;
	            }
	            text_view.setText(String.valueOf(count++));
	            if (count >= 50) {
	                Log.e("shaomiao", "thread" + count + Thread.currentThread().getName());
	                Message message = new Message();
	                message.what = 1;
	                handlerStop.sendMessage(message);
	            }
	            handler.postDelayed(update_thread, 20000);
	        }
	    };

	    @Override
	    protected void onCreate(@Nullable Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);
	        setContentView(R.layout.activity_main2);
	        text_view = (TextView) findViewById(R.id.text_view);
	        start = (Button) findViewById(R.id.start);
	        start.setOnClickListener(new StartClickListener());
	        end = (Button) findViewById(R.id.end);
	        end.setOnClickListener(new EndClickListener());
	//        handler.post(update_thread);
	    }

	    private class StartClickListener implements View.OnClickListener {
	        public void onClick(View v) {
	            Log.e("shaomiao", "StartClickListener" + count);
	            if (count==0)
	                handler.post(update_thread);
	        }
	    }

	    private class EndClickListener implements View.OnClickListener {
	        public void onClick(View v) {
	            count = 0;
	            Log.e("shaomiao", "EndClickListener" + count);
	            handler.removeCallbacks(update_thread);
	        }
	    }

	    final Handler handlerStop = new Handler() {
	        public void handleMessage(Message msg) {
	            switch (msg.what) {
	                case 1:
	                    count = 0;
	                    Log.e("shaomiao", "EndClickListener" + count);
	                    handler.removeCallbacks(update_thread);
	                    break;

	            }
	            super.handleMessage(msg);
	        }
	    };
	}