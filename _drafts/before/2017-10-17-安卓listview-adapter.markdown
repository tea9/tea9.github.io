---
layout:     post
title:      "安卓listview-adapter"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
1.首先添加一个布局listview

	<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
		android:orientation="vertical" android:layout_width="match_parent"
		android:layout_height="match_parent">
		//android:divider="@null"去掉listview分割线
		<ListView
			android:id="@+id/redpageList"
			android:divider="@null"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content">
		</ListView>
	</LinearLayout>

2.创建一个activity加载listview布局

	public class RedPageActivity extends Activity {
		private ListView lv;
		//判断复用问题的map int坐标 bool为是否加载过 true为存在 falsely不存在
		private Map<Integer,Boolean> selectedMap=new HashMap<>();
		//提供了一种关于显示的通用信息，如显示大小，分辨率和字体
		DisplayMetrics dm = new DisplayMetrics();

		@Override
		protected void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			//加载listview布局
			setContentView(R.layout.activity_redpage);
			//获取listview
			lv=(ListView)findViewById(R.id.redpageList);
			//初始化map的数据 都为false
			for (int i = 0; i < 10; i++) {
				selectedMap.put(i, false);
			}
			getWindowManager().getDefaultDisplay().getMetrics(dm);
			//获取系统宽度
			System.out.println("dm"+dm.widthPixels);
			//创建的adapter
			RedpageActivityAdapter redpageAdapter=new RedpageActivityAdapter(this,selectedMap,dm);
			//给listview设置适配器
			lv.setAdapter(redpageAdapter);
			//点击事件
			lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
				@Override
				public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
					System.out.println("aaa"+position);
					//判断复用问题 
					//不存在就put
					if (!selectedMap.containsKey(position)){
						selectedMap.put(position,true);
					}
					else{
						//存在就改变
						boolean isCheck=selectedMap.get(position);
						selectedMap.put(position,!isCheck);
					}

					RedpageActivityAdapter.ViewHolder viewHolder = (RedpageActivityAdapter.ViewHolder) parent.getTag();
					//一个属性动画
					ObjectAnimator animator = ObjectAnimator.ofFloat(view.findViewById(R.id.redup), "translationX", 0, -(dm.widthPixels));
					ObjectAnimator animator2 = ObjectAnimator.ofFloat(view.findViewById(R.id.redback), "translationX", 0, -(dm.widthPixels));
					AnimatorSet animSet=new AnimatorSet();
					animSet.playTogether(animator,animator2);
					animSet.setDuration(400);
					animSet.start();
				}
			});

		}
	}

3创建RedpageActivityAdapter

	public class RedpageActivityAdapter extends BaseAdapter {
		//数据集合
		private List arrayList=new ArrayList();
		//上下文对象
		private Context context;
		private Map<Integer,Boolean> map;
		DisplayMetrics dm;
		public RedpageActivityAdapter(Context context,Map<Integer,Boolean> map,DisplayMetrics dm) {
			this.context=context;
			this.map=map;
			this.dm=dm;
			System.out.println("dm"+dm);
			//一些假数据
			for (int i=0;i<10;i++){
				arrayList.add("zzz"+i);
			}
		}
		//集合的长度
		@Override
		public int getCount() {
			return arrayList!=null&&arrayList.size()>0?arrayList.size():0;
		}
		//获取item
		@Override
		public Object getItem(int position) {
			return arrayList!=null&&arrayList.size()>0?arrayList.get(position):null;
		}
		//根据位置获取item
		@Override
		public long getItemId(int position) {
			return position;
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {
			ViewHolder holder;
			if(convertView==null){
				holder = new ViewHolder();

				convertView = LayoutInflater.from(context).inflate(R.layout.adapter_red_page_fragment, null);
				holder.relative=(RelativeLayout) convertView.findViewById(R.id.relative);
				AbsListView.LayoutParams params=new AbsListView.LayoutParams((int)(dm.widthPixels-20*dm.density),(int)(dm.widthPixels-20*dm.density)/2);
				holder.relative.setLayoutParams(params);
				holder.redaon=(ImageView) convertView.findViewById(R.id.redaon);
				holder.redback=(ImageView) convertView.findViewById(R.id.redback);
				holder.redup=(ImageView) convertView.findViewById(R.id.redup);
				holder.textView=(TextView)convertView.findViewById(R.id.textView);



	//            holder.relative.setOnClickListener(new View.OnClickListener() {
	//                @Override
	//                public void onClick(View v) {
	//
	//                    int index=((ViewGroup)v.getParent()).indexOfChild(v);
	//                    System.out.println("aaaa"+index);
	//                    System.out.println("aaaa"+v.getId());
	//                    float curTranslationX = v.findViewById(R.id.redup).getTranslationX();
	//                    ObjectAnimator animator = ObjectAnimator.ofFloat(v.findViewById(R.id.redup), "translationX", curTranslationX, -600f);
	//                    ObjectAnimator animator2 = ObjectAnimator.ofFloat(v.findViewById(R.id.redback), "translationX", curTranslationX, -500f);
	////                    animator.setDuration(5000);
	////                    animator.start();
	//                    AnimatorSet animSet = new AnimatorSet();
	//                    animSet.playTogether(animator,animator2);
	//                    animSet.setDuration(500);
	//                    animSet.start();
	//                }
	//            });
				convertView.setTag(holder);
			}else{
				holder = (ViewHolder)convertView.getTag();//取出ViewHolder对象
			}
			//holder.redup.setImageResource(R.id.redup);
			holder.textView.setText(getItem(position).toString());
			boolean flag=map.get(position);
			
			if(flag){
				//移动当前的
				ObjectAnimator animator = ObjectAnimator.ofFloat(holder.redup, "translationX", 0, -(dm.widthPixels));
				ObjectAnimator animator2 = ObjectAnimator.ofFloat(holder.redback, "translationX", 0, -(dm.widthPixels));
				AnimatorSet animSet=new AnimatorSet();
				animSet.playTogether(animator,animator2);
				animSet.setDuration(0);
				animSet.start();
			}else {
				//原始位置
				ObjectAnimator animator = ObjectAnimator.ofFloat(holder.redup, "translationX", 0, -0);
				ObjectAnimator animator2 = ObjectAnimator.ofFloat(holder.redback, "translationX", 0, -0);
				AnimatorSet animSet=new AnimatorSet();
				animSet.playTogether(animator,animator2);
				animSet.setDuration(0);
				animSet.start();
			}
			return convertView;
		}
		//自定义viewholder用于初始化话控件
		public class ViewHolder {
			private RelativeLayout layout;
			public ImageView redback;
			public ImageView redaon;
			public ImageView redup;
			public TextView textView;
			RelativeLayout relative;


		}
	}

4.listview中的小布局

	<?xml version="1.0" encoding="utf-8"?>
	
	<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
		android:id="@+id/relative"
		android:layout_width="match_parent"
		android:layout_height="match_parent"
		android:padding="10dp"
		>
		<ImageView
			android:id="@+id/redback"
			android:layout_width="match_parent"
			android:layout_height="match_parent"
			android:background="@mipmap/redback"
			/>
		<ImageView
			android:id="@+id/redaon"
			android:layout_width="match_parent"
			android:layout_height="match_parent"
			android:background="@mipmap/redaon"
			android:gravity="center_vertical"
			android:layout_margin="10dp"

			/>
		<!--android:layout_centerVertical="true"-->
		<ImageView
			android:id="@+id/redup"
			android:layout_marginRight="100dp"
			android:layout_width="match_parent"
			android:layout_height="match_parent"
			android:background="@mipmap/redup"
			/>
		<TextView
			android:id="@+id/textView"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:textSize="20dp"
			/>
		<TextView
			android:id="@+id/textView1"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:textSize="20dp"
			android:text="44444444"
			android:layout_below="@+id/textView"
			/>
	</RelativeLayout>

大概效果

![效果](http://upload-images.jianshu.io/upload_images/2590671-74f29aa729df3991.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
