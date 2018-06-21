---
layout: post
title: "recyclerview嵌套recyclerview"
date: 2018-06-21
category: android
tags: adnroid recyclerview
---

![效果](http://upload-images.jianshu.io/upload_images/2590671-98e8c1814b5456e3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![红色方框标出来的是recyclerview的item](http://upload-images.jianshu.io/upload_images/2590671-b73723cc237b3c76.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

实现思路就是在一个recyclerview的adapter中 在初始化一个recyclerview 的adapter

布局文件
activity_main.xml

	<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
		xmlns:tools="http://schemas.android.com/tools"
		android:id="@+id/activity_main"
		android:layout_width="match_parent"
		android:layout_height="match_parent"
		tools:context="com.project.recyclerviewtest.MainActivity">

		<RelativeLayout
			android:layout_width="match_parent"
			android:layout_height="match_parent">

		<ImageView
			android:id="@+id/image"
			android:layout_width="match_parent"
			android:layout_height="wrap_content"
			android:src="@mipmap/ic_launcher"/>

		<android.support.v7.widget.RecyclerView
			android:layout_below="@+id/image"
			android:id="@+id/recyclerView"
			android:layout_width="match_parent"
			android:layout_height="wrap_content">
		</android.support.v7.widget.RecyclerView>
		</RelativeLayout>
	</ScrollView>


MainActivity.java

	private RecyclerView recyclerView;

	private BusinessAdapter businessAdapter;

	private List<Object> mDatas;


	private ImageView imageView;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		initData();
		recyclerView = (RecyclerView) findViewById(R.id.recyclerView);

		recyclerView.setLayoutManager(new LinearLayoutManager(this));
		businessAdapter = new BusinessAdapter(this, mDatas);
	//        businessAdapter.setOnRecyclerViewListener(this);

		recyclerView.setAdapter(businessAdapter);
		imageView = (ImageView) findViewById(R.id.image);
		imageView.setOnClickListener(this);
		businessAdapter.setOnRecyclerViewListener(new BusinessAdapter.OnRecyclerViewListener() {
			@Override
			public void onBusinessImgClick(View view, int position) {

			}

			@Override
			public void onBusinessNameClick(View view, int position) {

			}
		});
	}

	// 数据
	protected void initData() {
		mDatas = new ArrayList<>();
		List<ProductEntity> products = new ArrayList<>();
		for (int i = 1; i < 10; i++) {
			ProductEntity productEntity = new ProductEntity();
			productEntity.setProductName("我是一个商品哈哈哈哈或或或" + i);
			productEntity.setProductImage("https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D200/sign=71cd4229be014a909e3e41bd99763971/472309f7905298221dd4c458d0ca7bcb0b46d442.jpg");
			productEntity.setProductPrice("99." + i);
			products.add(productEntity);
		}
		for (int i = 1; i < 30; i++) {
			BusinessEntity entity = new BusinessEntity();
			entity.setBusinessName("ddddfsdfdsfsdfsdfzzzz" + i);
			entity.setBusinessImage("https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1564533037,3918553373&fm=116&gp=0.jpg");
			entity.setProducts(products);
			mDatas.add(entity);
		}
	}

MainActivity 就是初始化数据和第一个recyclerview 


BusinessAdapter.java

	public class BusinessAdapter extends RecyclerView.Adapter<BusinessAdapter.MyViewHolder> {

		public interface OnRecyclerViewListener {

			// 点击商家图片
			void onBusinessImgClick(View view, int position);

			// 点击商家名称
			void onBusinessNameClick(View view, int position);
		}

		private OnRecyclerViewListener listener;

		private Context mContext;

		private List<Object> mData;

		public void setOnRecyclerViewListener(OnRecyclerViewListener mItemListener) {
			this.listener = mItemListener;

		}

		public BusinessAdapter(Context context, List<Object> datas) {
			this.mContext = context;
			this.mData = datas;
		}

		@Override
		public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
			View view = LayoutInflater.from(mContext).inflate(R.layout.item_business, parent, false);
			MyViewHolder myViewHolder = new MyViewHolder(view);
			return myViewHolder;
		}

		@Override
		public void onBindViewHolder(final MyViewHolder holder, final int position) {
			final BusinessEntity entity = (BusinessEntity) mData.get(position);
			holder.businessName.setText(entity.getBusinessName());
			Glide
					.with(mContext)
					.load(entity.getBusinessImage())
					.centerCrop()
					.placeholder(R.mipmap.ic_launcher)
					.crossFade()
					.into(holder.businessImg);


			// 关键代码
			//////////////////////////////////////////////////
			ProductAdapter productAdapter = new ProductAdapter(mContext, entity.getProducts());

			LinearLayoutManager linearLayoutManager = new LinearLayoutManager(mContext);
			linearLayoutManager.setOrientation(LinearLayoutManager.HORIZONTAL);
			holder.productList.setLayoutManager(linearLayoutManager);
			holder.productList.setAdapter(productAdapter);
			holder.productList.setVisibility(View.VISIBLE);
			/////////////////////////////////////////////////////

			// 是否点击收藏
			if (entity.isCollection()) {
				holder.collectionImg.setImageResource(R.mipmap.collection_true);
			} else {
				holder.collectionImg.setImageResource(R.mipmap.collection_false);
			}

			holder.isCollection.setOnClickListener(new View.OnClickListener() {
				@Override
				public void onClick(View view) {
					if (entity.isCollection()) {
						((BusinessEntity) mData.get(position)).setCollection(false);
						holder.collectionImg.setImageResource(R.mipmap.collection_false);
					} else {
						((BusinessEntity) mData.get(position)).setCollection(true);
						holder.collectionImg.setImageResource(R.mipmap.collection_true);
					}
				}
			});

			if (listener != null) {
				// 商家图片点击事件
				holder.businessImg.setOnClickListener(new View.OnClickListener() {
					@Override
					public void onClick(View view) {
						listener.onBusinessImgClick(view, position);
					}
				});
				// 商家名称点击事件
				holder.businessName.setOnClickListener(new View.OnClickListener() {
					@Override
					public void onClick(View view) {
						listener.onBusinessNameClick(view, position);
					}
				});
			}
		}

		@Override
		public int getItemCount() {
			return mData.size();
		}

		class MyViewHolder extends RecyclerView.ViewHolder {

			ImageView businessImg;
			TextView businessName;
			LinearLayout isCollection;
			ImageView collectionImg;
			RecyclerView productList;

			public MyViewHolder(View itemView) {
				super(itemView);
				businessImg = (ImageView) itemView.findViewById(R.id.businessImg_Iv);
				businessName = (TextView) itemView.findViewById(R.id.productName_Tv);
				isCollection = (LinearLayout) itemView.findViewById(R.id.isCollection_Ll);
				collectionImg = (ImageView) itemView.findViewById(R.id.collection_Iv);
				productList = (RecyclerView) itemView.findViewById(R.id.productRv);
			}
		}

	}


BusinessAdapter 的item布局

item_business.xml


![布局长这样](http://upload-images.jianshu.io/upload_images/2590671-3c5171bb38c178f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

	<?xml version="1.0" encoding="utf-8"?>
	<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
		android:layout_width="match_parent"
		android:layout_height="wrap_content"
		android:paddingBottom="10dp">
		<LinearLayout
			android:layout_width="match_parent"
			android:layout_height="wrap_content"
			android:orientation="vertical"
			android:padding="10dp">
		<LinearLayout
			android:layout_margin="5dp"
			android:padding="5dp"
			android:background="@drawable/border"
			android:orientation="horizontal"
			android:layout_width="match_parent"
			android:layout_height="60dp">
			<ImageView
				android:id="@+id/businessImg_Iv"
				android:layout_width="50dp"
				android:layout_height="50dp"
				android:src="@mipmap/ic_launcher"/>
			<TextView
				android:id="@+id/productName_Tv"
				android:paddingLeft="5dp"
				android:layout_gravity="center_vertical"
				android:layout_weight="1"
				android:layout_width="wrap_content"
				android:layout_height="wrap_content"
				android:text="Burberry"/>

			<LinearLayout
				android:id="@+id/isCollection_Ll"
				android:layout_gravity="center_vertical"
				android:orientation="vertical"
				android:layout_width="wrap_content"
				android:layout_height="wrap_content">
				<ImageView
					android:id="@+id/collection_Iv"
					android:layout_gravity="center"
					android:layout_width="20dp"
					android:layout_height="20dp"
					android:src="@mipmap/ic_launcher"/>
				<TextView
					android:layout_gravity="center"
					android:layout_width="wrap_content"
					android:layout_height="wrap_content"
					android:text="收藏"/>
			</LinearLayout>
		</LinearLayout>
			<android.support.v7.widget.RecyclerView
				android:id="@+id/productRv"
				android:layout_width="match_parent"
				android:layout_height="wrap_content"
				android:layout_marginBottom="5dp" />

		</LinearLayout>

	</RelativeLayout>


ProductAdapter.java

	public class ProductAdapter extends RecyclerView.Adapter<ProductAdapter.MyViewHolder> {

		DisplayMetrics dm;

		private Context mContext;

		private List<ProductEntity> mDatas;

		public ProductAdapter(Context context, List<ProductEntity> data) {
			this.mContext = context;
			this.mDatas = data;

			dm = new DisplayMetrics();
			((Activity) context).getWindowManager().getDefaultDisplay().getMetrics(dm);
		}


		@Override
		public ProductAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
			View view = LayoutInflater.from(mContext).inflate(R.layout.item_product, parent, false);
			MyViewHolder myViewHolderw = new MyViewHolder(view);
			//动态设置ImageView的宽高，根据自己每行item数量计算
			//dm.widthPixels-dip2px(20)即屏幕宽度-左右10dp+10dp=20dp再转换为px的宽度，最后/3得到每个item的宽高
			RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams((dm.widthPixels - dip2px(20)) / 3, ViewGroup.LayoutParams.WRAP_CONTENT);
			view.setLayoutParams(lp);
			return myViewHolderw;
		}

		@Override
		public void onBindViewHolder(ProductAdapter.MyViewHolder holder, int position) {
			ProductEntity entity = mDatas.get(position);
			holder.productName.setText(entity.getProductName());
			holder.productPrice.setText(entity.getProductPrice());
			Glide
					.with(mContext)
					.load(entity.getProductImage())
					.centerCrop()
					.placeholder(R.mipmap.ic_launcher)
					.crossFade()
					.into(holder.productImg);
	//        holder.productImg.setImageResource(R.mipmap.ic_launcher);
		}


		@Override
		public int getItemCount() {
			return mDatas.size();
		}

		class MyViewHolder extends RecyclerView.ViewHolder {

			ImageView productImg;
			TextView productName;
			TextView productPrice;

			public MyViewHolder(View itemView) {
				super(itemView);
				productImg = (ImageView) itemView.findViewById(R.id.productImg_Iv);
				productName = (TextView) itemView.findViewById(R.id.productName_Tv);
				productPrice = (TextView) itemView.findViewById(R.id.productPrice_Tv);
			}
		}


		int dip2px(float dpValue) {
			final float scale = mContext.getResources().getDisplayMetrics().density;
			return (int) (dpValue * scale + 0.5f);
		}
	}



item_product.xml

	<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
		android:orientation="vertical"
		android:layout_width="wrap_content"
		android:layout_height="wrap_content">

		<ImageView
			android:id="@+id/productImg_Iv"
			android:layout_gravity="center"
			android:layout_width="wrap_content"
			android:layout_height="match_parent"
			android:src="@mipmap/ic_launcher"/>
		<TextView
			android:id="@+id/productName_Tv"
			android:layout_width="wrap_content"
			android:layout_height="wrap_content" />
		<LinearLayout
			android:layout_width="wrap_content"
			android:layout_height="wrap_content"
			android:orientation="horizontal">
			<TextView
				android:layout_width="wrap_content"
				android:layout_height="wrap_content"
				android:text="￥"/>
			<TextView
				android:id="@+id/productPrice_Tv"
				android:layout_width="wrap_content"
				android:layout_height="wrap_content"
				android:text="99.00"/>
		</LinearLayout>

	</LinearLayout>
