---
layout:     post
title:      "RecyclerView"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android"
---
引入RecyclerView包
compile 'com.android.support:recyclerview-v7:25.1.0'

main_layout布局

![垂直](http://upload-images.jianshu.io/upload_images/2590671-1d77970d8762ca87.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


	<LinearLayout
		xmlns:android="http://schemas.android.com/apk/res/android"
		xmlns:tools="http://schemas.android.com/tools"
		android:layout_width="match_parent"
		android:layout_height="match_parent"
		tools:context="com.example.recyclerviewtest.MainActivity">

		<android.support.v7.widget.RecyclerView
			android:id="@+id/recycler_view"
			android:layout_width="match_parent"
			android:layout_height="match_parent">
		</android.support.v7.widget.RecyclerView>
	</LinearLayout>

fruit_item.xml

	<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
				  android:orientation="horizontal"
				  android:layout_width="match_parent"
				  android:layout_height="wrap_content">

		<ImageView
			android:id="@+id/fruit_image"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"/>

		<TextView
			android:id="@+id/fruit_name"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:layout_gravity="center_vertical"
			android:layout_marginLeft="10dp"/>
	</LinearLayout>

Fruit .class

	public class Fruit {

		private String name;

		private int imageId;

		public Fruit(String name, int imageId) {
			this.name = name;
			this.imageId = imageId;
		}

		public String getName() {
			return name;
		}

		public int getImageId() {
			return imageId;
		}
	}



适配器
首先继承RecyclerView.Adapter


	public class FruitAdapter extends RecyclerView.Adapter<FruitAdapter.ViewHolder> {

		private List<Fruit> mFruitList;

		static class ViewHolder extends RecyclerView.ViewHolder {
			ImageView fruitImage;
			TextView fruitName;

			public ViewHolder(View itemView) {
				super(itemView);
				fruitImage = (ImageView) itemView.findViewById(R.id.fruit_image);
				fruitName = (TextView) itemView.findViewById(R.id.fruit_name);
			}
		}

		public FruitAdapter(List<Fruit> fruitList) {
			mFruitList = fruitList;
		}

		@Override
		public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
			View view = LayoutInflater.from(parent.getContext())
					.inflate(R.layout.fruit_item, parent, false);
			ViewHolder holder = new ViewHolder(view);
			return holder;
		}

		@Override
		public void onBindViewHolder(ViewHolder holder, int position) {
			Fruit fruit = mFruitList.get(position);
			holder.fruitImage.setImageResource(fruit.getImageId());
			holder.fruitName.setText(fruit.getName());
		}

		@Override
		public int getItemCount() {
			return mFruitList.size();
		}


	}

MainActivity

	private List<Fruit> fruitList = new ArrayList<>();

oncreate

		initFruits();
		RecyclerView recyclerView = (RecyclerView) findViewById(R.id.recycler_view);
		LinearLayoutManager layoutManager = new LinearLayoutManager(this);
		recyclerView.setLayoutManager(layoutManager);
		FruitAdapter adapter = new FruitAdapter(fruitList);
		recyclerView.setAdapter(adapter);

	private void initFruits() {
		for (int i = 0; i < 2; i++) {
			Fruit apple = new Fruit("appale", R.mipmap.ic_launcher);
			fruitList.add(apple);
			Fruit banana = new Fruit("banana", R.mipmap.ic_launcher);
			fruitList.add(banana);
			Fruit orange = new Fruit("orange", R.mipmap.ic_launcher);
			fruitList.add(orange);
			Fruit watermelon = new Fruit("watermelon", R.mipmap.ic_launcher);
			fruitList.add(watermelon);
			Fruit pear = new Fruit("pear", R.mipmap.ic_launcher);
			fruitList.add(pear);
			Fruit grape = new Fruit("grape", R.mipmap.ic_launcher);
			fruitList.add(grape);
			Fruit pineapple = new Fruit("pineapple", R.mipmap.ic_launcher);
			fruitList.add(pineapple);
			Fruit strawberry = new Fruit("strawberry", R.mipmap.ic_launcher);
			fruitList.add(strawberry);
			Fruit cherry = new Fruit("cherry", R.mipmap.ic_launcher);
			fruitList.add(cherry);
			Fruit Mango = new Fruit("Mango", R.mipmap.ic_launcher);
			fruitList.add(Mango);
		}
	}



把垂直布局修改成水平

![recyclerview](http://upload-images.jianshu.io/upload_images/2590671-e174091cd55382a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


	layoutManager.setOrientation(LinearLayoutManager.HORIZONTAL);

修改布局item布局

	<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
				  android:orientation="vertical"
				  android:layout_width="100dp"
				  android:layout_height="wrap_content">

		<ImageView
			android:id="@+id/fruit_image"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:layout_gravity="center_horizontal"/>

		<TextView
			android:id="@+id/fruit_name"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:layout_gravity="center_horizontal"
			android:layout_marginTop="10dp"/>
	</LinearLayout>



瀑布流

![瀑布流](http://upload-images.jianshu.io/upload_images/2590671-33f944c5a985de65.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


	StaggeredGridLayoutManager layoutManager = new
					StaggeredGridLayoutManager(3, StaggeredGridLayoutManager.VERTICAL);

item布局

	<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
				  android:orientation="vertical"
				  android:layout_width="match_parent"
				  android:layout_height="wrap_content"
				  android:layout_margin="5dp">

		<ImageView
			android:id="@+id/fruit_image"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:layout_gravity="center_horizontal"/>

		<TextView
			android:id="@+id/fruit_name"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:layout_gravity="left"
			android:layout_marginTop="10dp"/>
	</LinearLayout>


点击事件

	public class FruitAdapter extends RecyclerView.Adapter<FruitAdapter.ViewHolder> {



		private List<Fruit> mFruitList;

		static class ViewHolder extends RecyclerView.ViewHolder {
			View fruitView;
			ImageView fruitImage;
			TextView fruitName;

			public ViewHolder(View itemView) {
				super(itemView);
				fruitView = itemView;
				fruitImage = (ImageView) itemView.findViewById(R.id.fruit_image);
				fruitName = (TextView) itemView.findViewById(R.id.fruit_name);
			}
		}

		public FruitAdapter(List<Fruit> fruitList) {
			mFruitList = fruitList;
		}

		@Override
		public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
			View view = LayoutInflater.from(parent.getContext())
					.inflate(R.layout.fruit_item2, parent, false);
			final ViewHolder holder = new ViewHolder(view);
			// 点击view
			holder.fruitView.setOnClickListener(new View.OnClickListener(){

				@Override
				public void onClick(View view) {
					int position = holder.getAdapterPosition();
					Fruit fruit = mFruitList.get(position);
					Toast.makeText(view.getContext(), "you clicked view" + fruit.getName(), Toast.LENGTH_SHORT).show();
				}
			});
			// 点击图片
			holder.fruitImage.setOnClickListener(new View.OnClickListener(){

				@Override
				public void onClick(View view) {
					int position = holder.getAdapterPosition();
					Fruit fruit = mFruitList.get(position);
					Toast.makeText(view.getContext(), "you clicked image" + fruit.getName(), Toast.LENGTH_SHORT).show();
				}
			});
			return holder;
		}

		@Override
		public void onBindViewHolder(ViewHolder holder, int position) {
			Fruit fruit = mFruitList.get(position);
			holder.fruitImage.setImageResource(fruit.getImageId());
			holder.fruitName.setText(fruit.getName());
		}

		@Override
		public int getItemCount() {
			return mFruitList.size();
		}


	}
