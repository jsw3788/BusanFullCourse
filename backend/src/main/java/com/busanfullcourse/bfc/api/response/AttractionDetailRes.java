package com.busanfullcourse.bfc.api.response;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttractionDetailRes {

    private Long placeId;

    private String name;

    private String info;

    private String openTime;

    private Double lat;

    private Double lon;

    private String address;

    private Boolean category;

    private String phone;

    private String label;

    private String station;

    private Float averageScore;

    private String thumbnail;
}