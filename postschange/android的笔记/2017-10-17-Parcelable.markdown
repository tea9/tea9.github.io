---
layout:     post
title:      "Parcelable"
date:       2017-10-21
author:     "shaomiao"
header-img: "img/post-bg-android.jpg"
tags:
    - "android的笔记"
---
	public class Book implements Parcelable {

		public int bookId;
		public String bookName;

		public Book(int bookId, String bookName) {
			this.bookId = bookId;
			this.bookName = bookName;
		}

		public int describeContents() {
			return 0;
		}

		public void writeToParcel(Parcel out, int flags) {
			out.writeInt(bookId);
			out.writeString(bookName);
		}

		public static final Parcelable.Creator<Book> CREATOR = new Creator<Book>() {
			@Override
			public Book createFromParcel(Parcel parcel) {
				return new Book(parcel);
			}

			@Override
			public Book[] newArray(int i) {
				return new Book[i];
			}
		};

		private Book(Parcel in) {
			bookId = in.readInt();
			bookName = in.readString();
		}
	}
