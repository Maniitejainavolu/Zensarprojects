package com.zensar.core.models;

import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class LatestNewsModel {

	@ValueMapValue
	private String title;

	@ChildResource
	private List<NewsItem> carouselItems;

	/**
	 * Returns the list of carouselItemsList as authored in the component dialog.
	 * 
	 * @return list of carouselItems.
	 */
	public List<NewsItem> getCarouselItems() {
		return carouselItems;
	}

	/**
	 * Returns the title authored in the dialog.
	 * 
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

}
