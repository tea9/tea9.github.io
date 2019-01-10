---
layout: post
title: "android_asynctask_code"
date: 2019-01-09
category: android
tags: android
---


	public class MainActivity extends AppCompatActivity {

	    // 线程变量
	    MyTask mTask;

	    // 主布局中的UI组件
	    Button button,cancel; // 加载、取消按钮
	    TextView text; // 更新的UI组件
	    ProgressBar progressBar; // 进度条

	    private class MyTask extends AsyncTask<String, Integer, String> {

	        // 方法1：onPreExecute（）
	        // 作用：执行 线程任务前的操作
	        @Override
	        protected void onPreExecute() {
	            text.setText("加载中");
	            // 执行前显示提示
	            Log.e("shaomiao","onPreExecute"+Thread.currentThread().getName());
	        }


	        // 方法2：doInBackground（）
	        // 作用：接收输入参数、执行任务中的耗时操作、返回 线程任务执行的结果
	        // 此处通过计算从而模拟“加载进度”的情况
	        @Override
	        protected String doInBackground(String... params) {

	            try {
	                int count = 0;
	                int length = 1;
	                while (count<99) {

	                    count += length;
	                    // 可调用publishProgress（）显示进度, 之后将执行onProgressUpdate（）
	                    publishProgress(count);
	                    // 模拟耗时任务
	                    Thread.sleep(50);
	                    Log.e("shaomiao","doInBackground"+Thread.currentThread().getName());
	                }
	            }catch (InterruptedException e) {
	                e.printStackTrace();
	            }

	            return null;
	        }

	        // 方法3：onProgressUpdate（）
	        // 作用：在主线程 显示线程任务执行的进度
	        @Override
	        protected void onProgressUpdate(Integer... progresses) {
	            Log.e("shaomiao","onProgressUpdate"+Thread.currentThread().getName());
	            progressBar.setProgress(progresses[0]);
	            text.setText("loading..." + progresses[0] + "%");

	        }

	        // 方法4：onPostExecute（）
	        // 作用：接收线程任务执行结果、将执行结果显示到UI组件
	        @Override
	        protected void onPostExecute(String result) {
	            Log.e("shaomiao","onPostExecute"+Thread.currentThread().getName());
	            // 执行完毕后，则更新UI
	            text.setText("加载完毕");
	        }

	        // 方法5：onCancelled()
	        // 作用：将异步任务设置为：取消状态
	        @Override
	        protected void onCancelled() {
	            Log.e("shaomiao","onCancelled"+Thread.currentThread().getName());
	            text.setText("已取消");
	            progressBar.setProgress(0);

	        }
	    }




	    @Override
	    protected void onCreate(@Nullable Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);
	        setContentView(R.layout.activity_main);
	        button = (Button) findViewById(R.id.button);
	        cancel = (Button) findViewById(R.id.cancel);
	        text = (TextView) findViewById(R.id.text);
	        progressBar = (ProgressBar) findViewById(R.id.progress_bar);

	        /**
	         * 步骤2：创建AsyncTask子类的实例对象（即 任务实例）
	         * 注：AsyncTask子类的实例必须在UI线程中创建
	         */
	        mTask = new MyTask();

	        // 加载按钮按按下时，则启动AsyncTask
	        // 任务完成后更新TextView的文本
	        button.setOnClickListener(new View.OnClickListener() {
	            @Override
	            public void onClick(View v) {

	                /**
	                 * 步骤3：手动调用execute(Params... params) 从而执行异步线程任务
	                 * 注：
	                 *    a. 必须在UI线程中调用
	                 *    b. 同一个AsyncTask实例对象只能执行1次，若执行第2次将会抛出异常
	                 *    c. 执行任务中，系统会自动调用AsyncTask的一系列方法：onPreExecute() 、doInBackground()、onProgressUpdate() 、onPostExecute()
	                 *    d. 不能手动调用上述方法
	                 */
	                mTask = new MyTask();
	                mTask.execute();
	            }
	        });

	        cancel = (Button) findViewById(R.id.cancel);
	        cancel.setOnClickListener(new View.OnClickListener() {
	            @Override
	            public void onClick(View v) {
	                // 取消一个正在执行的任务,onCancelled方法将会被调用
	                mTask.cancel(true);
	            }
	        });


	    }


	}


	<LinearLayout
	        xmlns:android="http://schemas.android.com/apk/res/android"
	        xmlns:tools="http://schemas.android.com/tools"
	        xmlns:app="http://schemas.android.com/apk/res-auto"
	        android:orientation="vertical"
	        android:layout_width="match_parent"
	        android:layout_height="match_parent"
	        tools:context=".MainActivity">
	    <TextView android:id="@+id/text" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="ss"/>

	    <Button
	            android:id="@+id/button"
	            android:layout_width="wrap_content"
	            android:layout_height="wrap_content"
	            android:text="开启"
	            app:layout_constraintBottom_toBottomOf="parent"
	            app:layout_constraintLeft_toLeftOf="parent"
	            app:layout_constraintRight_toRightOf="parent"
	            app:layout_constraintTop_toTopOf="parent"/>

	    <Button
	            android:id="@+id/cancel"
	            android:layout_width="wrap_content"
	            android:layout_height="wrap_content"
	            android:text="取消"
	            app:layout_constraintLeft_toLeftOf="parent"
	            app:layout_constraintRight_toRightOf="parent"
	            app:layout_constraintTop_toTopOf="parent"/>


	    <ProgressBar android:id="@+id/progress_bar" android:layout_width="wrap_content" android:layout_height="wrap_content"/>

	</LinearLayout>
