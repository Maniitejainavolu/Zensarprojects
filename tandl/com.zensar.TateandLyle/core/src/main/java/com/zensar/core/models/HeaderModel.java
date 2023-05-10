package com.zensar.core.models;

import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HeaderModel {

	@ValueMapValue
	private String fileReference;
	
	@ValueMapValue
	private String alt;

	@ChildResource
	private List<MainNavigation> mainNavList;

	@ChildResource
	private List<BlocNavigation> blocNavList;

	/**
	 * Returns the list of mainNavList as authored in the component dialog.
	 * 
	 * @return list of mainNavList.
	 */
	public List<MainNavigation> getMainNavList() {
		return mainNavList;
	}
	
	/**
	 * Returns the list of blocNavList as authored in the component dialog.
	 * 
	 * @return list of blocNavList.
	 */
	public List<BlocNavigation> getBlocNavList() {
		return blocNavList;
	}

	/**
	 * Returns the fileReference authored in the dialog.
	 * 
	 * @return the fileReference
	 */
	public String getFileReference() {
		return fileReference;
	}
	
	/**
	 * Returns the alt authored in the dialog.
	 * 
	 * @return the alt
	 */
	public String getAlt() {
		return alt;
	}

}
